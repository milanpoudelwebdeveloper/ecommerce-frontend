import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (_, action) => {
      return action.payload
    },
  },
})

export const { openDrawer } = drawerSlice.actions

export default drawerSlice.reducer
