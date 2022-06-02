import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const PrivateAuth = ({ children }) => {
  const router = useRouter()

  const { user } = useSelector((state) => state)

  const [userLoaded, setUserLoaded] = useState(false)

  const updateUser = () => {
    if (user) {
      setUserLoaded(true)
    } else {
      setUserLoaded(false)
      router.replace('/login')
    }
  }

  useEffect(() => {
    const intervalId = setInterval(updateUser, 2000)
    return () => clearInterval(intervalId)
  }, [user])

  if (!userLoaded) {
    return <p>Loading</p>
  }

  return userLoaded && <>{children}</>
}

export default PrivateAuth
