import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  text: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    //need to work on this
    searchQuery: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { searchQuery } = searchSlice.actions

export default searchSlice.reducer
