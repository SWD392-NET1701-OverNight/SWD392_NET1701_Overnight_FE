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
    addCategory: (state, action) => {
      state.listCategory.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { catID, data } = action.payload
      const categoryItem = state.listCategory.find((item) => item.catID === catID)
      if (categoryItem) {
        categoryItem.catName = data.catName
        categoryItem.description = data.description
      }
    },
    deleteCategory: (state, action) => {
      const catID = action.payload
      state.listCategory = state.listCategory.filter((item) => item.catID !== catID)
    },
  },
})

// Action creators are generated for each case reducer function
export const categoryActions = categorySlice.actions

export default categorySlice.reducer
