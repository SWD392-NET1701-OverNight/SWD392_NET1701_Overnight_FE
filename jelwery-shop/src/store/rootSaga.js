import { all } from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import productSaga from '../feature/product/productSaga'
import requestSaga from '../feature/request/requestSaga'
import meterialSaga from '../feature/material/materialSaga'
import productMaterailSaga from '../feature/product-material/productMaterialSaga'
function* rootSaga() {
  yield all([authSaga(), productSaga(), requestSaga(), meterialSaga(), productMaterailSaga()])
}
export default rootSaga
