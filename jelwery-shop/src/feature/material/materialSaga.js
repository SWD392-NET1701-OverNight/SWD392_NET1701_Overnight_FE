import { toast } from 'sonner'
import { call, put, takeEvery } from 'redux-saga/effects'
import materialApi from './materialApi'
import { materialAction } from './materialSlice'

function* getAllMaterial() {
  try {
    const resData = yield call(materialApi.getAllMateiral)
    if (resData.data) {
      yield put(materialAction.setMaterial(resData.data))
      return
    }
    toast.error(resData.message || 'Get material failed')
  } catch (e) {
    toast.error(e.response.data.message || 'Get material failed')
  }
}
export default function* materialSaga() {
  yield takeEvery('GET_LIST_MATERIAL_SAGA', getAllMaterial)
}
