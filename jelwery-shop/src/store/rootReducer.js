import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import productReducer from '../feature/product/productSlice'
import requestReucer from '../feature/request/requestSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  request: requestReucer,
})
export default rootReducer
