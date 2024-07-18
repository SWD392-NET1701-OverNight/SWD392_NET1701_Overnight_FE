import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import productReducer from '../feature/product/productSlice'
import requestReducer from '../feature/request/requestSlice'
import materialReducer from '../feature/material/materialSlice'
import productMaterialReducer from '../feature/product-material/productMaterialSlice'
import transactionReducer from '../feature/transaction/transactionSlice'
import designReducer from '../feature/design/designSlice'
import categoryReducer from '../feature/category/categorySlice'
import feedbackReducer from '../feature/feedback/feedbackSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  request: requestReducer,
  material: materialReducer,
  productMaterial: productMaterialReducer,
  transaction: transactionReducer,
  design: designReducer,
  category: categoryReducer,
  feedback: feedbackReducer,
})
export default rootReducer
