import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listCategory: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setListCategory: (state, action) => {
      state.listCategory = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const categoryActions = categorySlice.actions

export default categorySlice.reducer
