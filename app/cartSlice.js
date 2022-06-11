import { createSlice } from '@reduxjs/toolkit'

let initialState = []

//load carts from localStorage first

if (typeof window !== 'undefined') {
  const cartExists = localStorage.getItem('ecommerce-cart')
  if (cartExists) initialState = JSON.parse(cartExists)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (_, action) => {
      return action.payload
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
