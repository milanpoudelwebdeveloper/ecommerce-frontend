import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../app/cartSlice'

const CartLoadingWrapper = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    let cart = []
    if (typeof window !== 'undefined') {
      const cartExists = window.localStorage.getItem('ecommerce-cart')
      if (cartExists) {
        cart = JSON.parse(cartExists)
        dispatch(addToCart(cart))
      }
    }
  })
  return <></>
}

export default CartLoadingWrapper
