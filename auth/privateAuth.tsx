import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '../app/store'

const PrivateAuth: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const router = useRouter()

  const { isLoggedIn } = useSelector((state: RootState) => state.user)

  const [userLoaded, setUserLoaded] = useState(false)

  const updateUser = () => {
    if (isLoggedIn) {
      setUserLoaded(true)
    } else {
      setUserLoaded(false)
      router.replace('/login')
    }
  }

  useEffect(() => {
    const intervalId = setInterval(updateUser, 2000)
    return () => clearInterval(intervalId)
  }, [isLoggedIn])

  if (!userLoaded) {
    return <p>Loading</p>
  }

  return userLoaded && <>{children}</>
}

export default PrivateAuth
