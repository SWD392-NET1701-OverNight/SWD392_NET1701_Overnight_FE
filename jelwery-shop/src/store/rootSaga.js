import { all } from 'redux-saga/effects'
import authSaga from '../feature/auth/authSaga'
import productSaga from '../feature/product/productSaga'
import requestSaga from '../feature/request/requestSaga'
import productMaterailSaga from '../feature/product-material/productMaterialSaga'
import materialSaga from '../feature/material/materialSaga'
import transactionSaga from '../feature/transaction/transactionSaga'
import designSaga from '../feature/design/designSaga'
import categorySaga from '../feature/category/categorySaga'
import feedbackSaga from '../feature/feedback/feedbackSage'
function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    requestSaga(),
    materialSaga(),
    productMaterailSaga(),
    transactionSaga(),
    designSaga(),
    categorySaga(),
    feedbackSaga(),
  ])
}
export default rootSaga
