import { all } from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import productSaga from '../feature/product/productSaga'
import requestSaga from '../feature/request/requestSaga'
function* rootSaga() {
  yield all([authSaga(), productSaga(), requestSaga()])
}
export default rootSaga
