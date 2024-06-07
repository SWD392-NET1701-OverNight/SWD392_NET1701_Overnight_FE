import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listProduct: [],
  productDetail: {},
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setListProduct: (state, action) => {
      state.listProduct = action.payload
    },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const productAction = productSlice.actions

export default productSlice.reducer
