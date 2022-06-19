import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../apiFunctions/user'
import { logIn } from '../../app/userSlice'
import { auth } from '../../utils/firebase'

// this app wrapper is for checking whether there is current user logged in the firebase
//if there is then when app starts we check for it and update redux store with the current user

//the need of creating this myappwrapper component is because we can't use dispatch function that is outside of
//redux provider.

const AppWrapper: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    //we are checking whether there is any user logged in using the func onAuthStateChanged given by the firebase
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        //we get the user info like email and token and store in the redux store
        getCurrentUser(idTokenResult.token)
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
          })
          .catch((e) => {
            console.log('Something went wrong', e)
          })
      }
    })
    //since we don't want this function to run all the time or have memory leak so we clean it using cleanup function
    return () => unSubscribe()
  }, [])
  return <>{children}</>
}

export default AppWrapper
