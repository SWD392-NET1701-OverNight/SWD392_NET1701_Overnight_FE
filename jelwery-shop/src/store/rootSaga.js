import { all } from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import productSaga from '../feature/product/productSaga'
import requestSaga from '../feature/request/requestSaga'
import productMaterailSaga from '../feature/product-material/productMaterialSaga'
import materialSaga from '../feature/material/materialSaga'
function* rootSaga() {
  yield all([authSaga(), productSaga(), requestSaga(), materialSaga(), productMaterailSaga()])
}
export default rootSaga
