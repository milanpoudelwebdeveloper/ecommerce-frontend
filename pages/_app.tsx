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
import AppWrapper from '../components/Wrappers/AppWrapper'
import { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SideDrawer />
        {/* Wrapping the above wrapper to all components */}
        <CartLoadingWrapper />
        <AppWrapper>
          <ToastContainer />
          <Navbar />
          <Component {...pageProps} />
        </AppWrapper>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
