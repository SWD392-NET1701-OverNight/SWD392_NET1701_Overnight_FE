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
    resetProductDetail: (state) => {
      state.productDetail = {}
    },
    addProduct: (state, action) => {
      state.listProduct.push(action.payload)
    },
    updateProduct: (state, action) => {
      const { productID, data } = action.payload
      const index = state.listProduct.findIndex((product) => product.productID === productID)
      state.listProduct[index] = data
    },
  },
})

// Action creators are generated for each case reducer function
export const productAction = productSlice.actions

export default productSlice.reducer
