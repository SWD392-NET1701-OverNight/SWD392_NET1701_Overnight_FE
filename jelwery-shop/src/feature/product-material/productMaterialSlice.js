import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listProductMaterial: [],
}

export const productMaterialSlice = createSlice({
  name: 'product-material',
  initialState,
  reducers: {
    setProductMaterial: (state, action) => {
      state.listProductMaterial = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const productMaterialAction = productMaterialSlice.actions

export default productMaterialSlice.reducer
