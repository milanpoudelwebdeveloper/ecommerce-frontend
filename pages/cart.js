import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItems from '../components/CartPage/CartItems'
import { getTotalPrice } from '../utils/getTotalPrice'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart)

  const user = useSelector((state) => state.user)

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <h4>Cart / {cartItems.length} Products</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length < 0 ? (
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
              <p>
                {title} X {count} = ${price * count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotalPrice(cartItems)}</b>
          <hr />
          {user ? (
            <button className="btn btn-sm btn-primary mt-2">
              Proceed to checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              Login to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
