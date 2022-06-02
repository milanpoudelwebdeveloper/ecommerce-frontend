import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      return action.payload
    },
    logOut: (state, action) => {
      return action.payload
    },
  },
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer
