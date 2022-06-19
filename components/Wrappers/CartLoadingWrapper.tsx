import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../app/cartSlice'

const CartLoadingWrapper = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let cartExists = window.localStorage.getItem('ecommerce-cart')
      if (cartExists) {
        const cartItems = JSON.parse(cartExists)
        if (cartItems && cartItems.length > 0) {
          dispatch(addToCart(cartItems))
        } else {
          dispatch(addToCart([]))
        }
      }
    }
  })
  return <></>
}

export default CartLoadingWrapper
