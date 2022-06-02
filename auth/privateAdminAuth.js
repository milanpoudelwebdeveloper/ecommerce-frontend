import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getCurrentAdmin } from '../apiFunctions/user'
import { toast } from 'react-toastify'

const PrivateAdminAuth = ({ children }) => {
  const router = useRouter()

  const { user } = useSelector((state) => state)

  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (user && user.token) {
      getCurrentAdmin(user.token)
        .then((res) => {
          setOk(true)
        })
        .catch((e) => {
          toast.error('Access not approved')
          setOk(false)
          router.replace('/')
        })
    }
  }, [user])

  return ok && <>{children}</>
}

export default PrivateAdminAuth
