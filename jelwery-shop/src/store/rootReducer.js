import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import productReducer from '../feature/product/productSlice'

const rootReducer = combineReducers({ auth: authReducer, product: productReducer })
export default rootReducer
