import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItems from '../components/CartItems'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart)

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
        <div className="col-md-4">Order Summary</div>
      </div>
    </div>
  )
}

export default Cart
