import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getCurrentAdmin } from '../apiFunctions/user'
import { toast } from 'react-toastify'
import { RootState } from '../app/store'
import { LOGIN } from '../routes'

const PrivateAdminAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()

  const { isLoggedIn, user } = useSelector((state: RootState) => state.user)

  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentAdmin(user?.token)
        .then((_) => {
          setOk(true)
        })
        .catch(() => {
          toast.error('Access not approved')
          setOk(false)
          router.replace('/')
        })
    } else {
      router.replace(LOGIN)
    }
  }, [isLoggedIn, user])

  return <>{ok && children}</>
}

export default PrivateAdminAuth
