import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import productReducer from '../feature/product/productSlice'
import requestReducer from '../feature/request/requestSlice'
import materialReducer from '../feature/material/materialSlice'
import productMaterialReducer from '../feature/product-material/productMaterialSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  request: requestReducer,
  material: materialReducer,
  productMaterial: productMaterialReducer,
})
export default rootReducer
