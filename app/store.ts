import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import searchReducer from './searchSlice'
import cartReducer from './cartSlice'

import drawerReducer from './drawerSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
