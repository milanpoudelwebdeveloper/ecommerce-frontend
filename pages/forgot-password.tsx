import { sendPasswordResetEmail } from 'firebase/auth'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '../app/store'
import { LOGIN } from '../routes'
import { auth } from '../utils/firebase'

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useSelector((state: RootState) => state.user)
  if (isLoggedIn) {
    router.replace('/')
  }

  const forgotPassword = (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    const config = {
      url: LOGIN,
      handleCodeInApp: true,
    }
    sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success('Check your email for password reset link')
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
          <h4>Reset Your Password</h4>
          <form onSubmit={forgotPassword}>
            <input
              required
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email"
            />

            <button
              type="submit"
              className="btn btn-primary my-3"
              style={{ width: '100%' }}
            >
              {loading ? 'Loading' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
