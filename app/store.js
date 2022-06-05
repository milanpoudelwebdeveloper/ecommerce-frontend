import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
})
