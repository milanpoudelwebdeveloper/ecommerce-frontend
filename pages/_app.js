import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/pagination.css'
import '../styles/carousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Navbar from '../components/navs/navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { logIn } from '../app/userSlice'
import { getCurrentUser } from '../apiFunctions/user'
import CartLoadingWrapper from '../components/Wrappers/CartLoadingWrapper'
import SideDrawer from '../components/Common/SideDrawer'

// this app wrapper is for checking whether there is current user logged in the firebase
//if there is then when app starts we check for it and update redux store with the current user

//the need of creating this myappwrapper component is because we can't use dispatch function that is outside of
//redux provider.
const MyAppWrapper = ({ children }) => {
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
                email: res.data.email,
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
                token: idTokenResult.token,
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

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SideDrawer />
      {/* Wrapping the above wrapper to all components */}
      <CartLoadingWrapper />
      <MyAppWrapper>
        <ToastContainer />
        <Navbar />
        <Component {...pageProps} />
      </MyAppWrapper>
    </Provider>
  )
}

export default MyApp
