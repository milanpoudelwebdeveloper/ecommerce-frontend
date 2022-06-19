import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let initialState: ICart[] = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (_, action: PayloadAction<ICart[]>) => {
      return [...action.payload]
    },
    emptyCart: () => {
      return []
    },
  },
})

export const { addToCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer
