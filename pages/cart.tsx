import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import CartItems from '../components/CartPage/CartItems'
import { LOGIN } from '../routes'
import { getTotalPrice } from '../utils/getTotalPrice'

const Cart: NextPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart)

  const { isLoggedIn } = useSelector((state: RootState) => state.user)

  const router = useRouter()

  const saveOrderToDb = () => {}

  const goToLogin = () => {
    router.push({
      pathname: LOGIN,
      query: { from: '/cart' },
    })
  }

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <h4>Cart / {cartItems.length} Products</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length <= 0 ? (
            <h4 className="m-4">
              No products on the cart item.
              <Link href={'/shop'} passHref>
                Continue Shopping
              </Link>
            </h4>
          ) : (
            <CartItems cart={cartItems} />
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cartItems.map(({ title, count, price }, i) => (
            <div key={i}>
              <p>{`${title} X ${count} = ${price * count}`}</p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotalPrice(cartItems)}</b>
          <hr />
          {isLoggedIn ? (
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={saveOrderToDb}
              disabled={!cartItems.length}
            >
              Proceed to checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2" onClick={goToLogin}>
              Login to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
