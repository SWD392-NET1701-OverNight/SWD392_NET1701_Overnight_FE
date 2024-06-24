import productMaterailApi from './productMaterialApi'
import { productMaterialAction } from './productMaterialSlice'
import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'
function* getProductMaterialById(action) {
  try {
    const resData = yield call(productMaterailApi.getProductMaterial, action.payload)
    yield put(productMaterialAction.setProductMaterial(resData))
  } catch (e) {
    toast.error(e.response.data.message)
  }
}
export default function* productMaterailSaga() {
  yield takeEvery('PRODUCT_MATERIAL_BY_ID', getProductMaterialById)
}
