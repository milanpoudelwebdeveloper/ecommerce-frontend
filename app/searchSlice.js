import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { searchQuery } = searchSlice.actions

export default searchSlice.reducer
