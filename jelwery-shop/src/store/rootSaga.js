import { all } from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import productSaga from '../feature/product/productSaga'
function* rootSaga() {
  yield all([authSaga(), productSaga()])
}
export default rootSaga
