import { updatePassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import PrivateAuth from '../../auth/privateAuth'
import UserNav from '../../components/Navs/UserNav'
import AdminNav from '../../components/Navs/AdminNav'
import { auth } from '../../utils/firebase'

const Password = () => {
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)

  const admin = user && user?.role === 'admin'

  const updatepassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (password.length < 6) {
      toast.error("Password can't be less than 6 characters")
      return
    } else if (password !== rePassword) {
      toast.error("Passwords don't match")
      return
    }
    const user = auth.currentUser

    updatePassword(user, password)
      .then(() => toast.success('Password updated successfully'))
      .catch((e) => toast.error(e.message))
    setLoading(false)
  }

  return (
    <PrivateAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">{admin ? <AdminNav /> : <UserNav />}</div>
          <div className="col">
            <h4>Update Your Password</h4>
            <form onSubmit={updatepassword}>
              <input
                required
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password"
              />
              <input
                required
                type="password"
                className="form-control mt-2"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Please re-enter your password"
              />

              <button
                type="submit"
                className="btn btn-primary my-3"
                disabled={loading}
              >
                Reset/Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </PrivateAuth>
  )
}

export default Password
