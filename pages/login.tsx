import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { logIn } from '../app/userSlice'
import { Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { createOrUpdateUser } from '../apiFunctions/user'
import { RootState } from '../app/store'
import { NextPage } from 'next'

const LogIn: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoggedIn } = useSelector((state: RootState) => state.user)

  let intentendRoute = router.query.from

  useEffect(() => {
    if (isLoggedIn && !intentendRoute) {
      router.replace('/')
    }
  }, [isLoggedIn])

  const roleBasedRedirect = (res: any) => {
    //check if intended
    if (intentendRoute) {
      router.push(intentendRoute as any)
      return
    }
    if (res.data.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/user/history')
    }
  }

  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      const idTokenResult = await user.getIdTokenResult()
      toast.success('Signed in successfully')
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch(
            logIn({
              user: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
              },
              isLoggedIn: true,
            })
          )
          roleBasedRedirect(res)
        })
        .catch((e) => {
          console.log(e)
        })
      // router.push("/");
    } catch (e: any) {
      console.log(e)
      toast.error(e.message)
    }
  }
  const googleLogIn = () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const { token } = await user.getIdTokenResult()
        createOrUpdateUser(token)
          .then((res) => {
            dispatch(
              logIn({
                user: {
                  _id: res.data._id,
                  name: res.data.name,
                  email: res.data.email,
                  role: res.data.role,
                  token: token,
                },
                isLoggedIn: true,
              })
            )
            // router.push("/");
            roleBasedRedirect(res)
          })
          .catch((e) => {
            console.log(e)
          })
      })
      .catch((e) => {
        console.log(e)
        toast.error(e.message)
      })
  }
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              login()
            }}
          >
            <input
              required
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email"
            />
            <input
              required
              type="password"
              className="form-control mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please enter your password"
            />

            <button
              type="submit"
              className="btn btn-primary my-3"
              style={{ width: '100%' }}
            >
              Login in with email
            </button>
            <Button
              className="mb-3"
              size="large"
              block
              onClick={googleLogIn}
              icon={<GoogleOutlined />}
            >
              Login in with Google
            </Button>
            <Link type="submit" href="/forgot-password" passHref>
              <p
                className="float-right text-danger"
                style={{ cursor: 'pointer' }}
              >
                Forgot Your Password?
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn
