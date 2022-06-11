import { createSlice } from '@reduxjs/toolkit'

let initialState = []

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
