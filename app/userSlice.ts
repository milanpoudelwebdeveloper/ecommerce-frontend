import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  user: {
    _id: string
    name: string
    email: string
    role: string
    token: string
  }
  isLoggedIn: boolean
}

const initialState: IUser = {
  user: {
    _id: '',
    name: '',
    email: '',
    role: '',
    token: '',
  },
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (_, action: PayloadAction<IUser>) => {
      return action.payload
    },
    logOut: (_, action) => {
      return action.payload
    },
  },
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer
