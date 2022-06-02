import React, { useEffect, useState } from 'react'
import { auth } from '../utils/firebase'
import {
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

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const userExists = useSelector((state) => state.user)

  useEffect(() => {
    if (userExists) {
      router.replace('/')
    }
  }, [userExists])

  const roleBasedRedirect = (res) => {
    //check if intended
    let intentendRoute = router.query
    if (intentendRoute) {
      router.push(intentendRoute.from)
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
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          )
          roleBasedRedirect(res)
        })
        .catch((e) => {
          console.log(e)
        })
      // router.push("/");
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }
  const googleLogIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const { token } = await user.getIdTokenResult()
        createOrUpdateUser(token)
          .then((res) => {
            dispatch(
              logIn({
                name: res.data.name,
                email: res.data.email,
                token: token,
                role: res.data.role,
                _id: res.data._id,
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
              type="danger"
              className="mb-3"
              size="large"
              block
              onClick={googleLogIn}
              icon={<GoogleOutlined />}
            >
              Login in with Google
            </Button>
            <Link type="submit" href="forgot-password" passHref>
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
