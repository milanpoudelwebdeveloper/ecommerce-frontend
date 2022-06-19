import React, { useState } from 'react'

import { sendSignInLinkToEmail } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '../../app/store'
import { NextPage } from 'next'

const Register: NextPage = () => {
  const [email, setEmail] = useState('')

  const router = useRouter()
  const { isLoggedIn } = useSelector((state: RootState) => state.user)
  if (isLoggedIn) {
    router.replace('/')
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //using config that is required by the firebase. here that config.url is the url that we redirect the user
    //to  after the user clicks on the link sent on the email by firebase
    const config: any = {
      url: process.env.NEXT_PUBLIC_REGISTER_COMPLETE,
      handleCodeInApp: true,
    }

    //we send sign in link to email and then store that email in localstorage for the complete registration use
    sendSignInLinkToEmail(auth, email, config)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email)
        toast.success(
          `Email is sent to ${email}. Please check your inbox to complete your registration`
        )
      })
      .catch((e) => toast.error(`${e.message}`))
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email"
            />
            <button type="submit" className="btn btn-primary mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
