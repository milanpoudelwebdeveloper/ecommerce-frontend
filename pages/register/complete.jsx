import React, { useEffect, useState } from 'react'
import { signInWithEmailLink, updatePassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logIn } from '../../app/userSlice'
import { useRouter } from 'next/router'
import { createOrUpdateUser } from '../../apiFunctions/user'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()

  //we check for the email saved in localstorage in the useeffect
  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn')
    if (email) {
      setEmail(email)
    }
  }, [])

  const completeRegistration = async (e) => {
    e.preventDefault()
    // we try to sign in with the email provided
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      )

      //if that email is verified in the firebase then we update the password of that user by giving them
      //the password input field to fill

      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForSignIn')
        //get user id token
        let user = auth.currentUser
        await updatePassword(user, updatePassword)
        const idTokenResult = await user.getIdTokenResult()

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              logIn({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
              })
            )
            router.push('/')
          })
          .catch((e) => {
            console.log(e)
            toast.error('Something went wrong')
          })
      }
      toast.success('Registation completed succesfully')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={completeRegistration}>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
            <input
              required
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please enter your password"
            />

            <button type="submit" className="btn btn-primary mt-3">
              Complete your registration
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
