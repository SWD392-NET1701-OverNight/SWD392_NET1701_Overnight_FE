import { call, put, takeEvery } from 'redux-saga/effects'
import productApi from './productApi'
import { productAction } from './productSlice'
import { toast } from 'sonner'

function* getListProduct() {
  try {
    const resData = yield call(productApi.getListProduct)
    yield put(productAction.setListProduct(resData))
  } catch (e) {
    toast.error(e.response.data.message)
  }
}

function* getProductById(action) {
  try {
    const resData = yield call(productApi.getProductById, action.payload)
    yield put(productAction.setProductDetail(resData))
  } catch (e) {
    toast.error('Get product detail failed!')
  }
}
export default function* productSaga() {
  yield takeEvery('PRODUCT_LIST_SAGA', getListProduct)
  yield takeEvery('PRODUCT_BY_ID_SAGA', getProductById)
}
