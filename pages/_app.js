import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/pagination.css'
import '../styles/carousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Navbar from '../components/Navs/navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import CartLoadingWrapper from '../components/Wrappers/CartLoadingWrapper'
import SideDrawer from '../components/Common/SideDrawer'
import MyAppWrapper from '../components/Wrappers/MyAppWrapper'

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
