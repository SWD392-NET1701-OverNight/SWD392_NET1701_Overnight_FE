import { toast } from 'sonner'
import { call, put, takeEvery } from 'redux-saga/effects'
import categoryApi from './categoryApi'
import { categoryActions } from './categorySlice'

function* getAllCategory() {
  try {
    const resData = yield call(categoryApi.getAllCategory)
    if (resData) {
      yield put(categoryActions.setListCategory(resData.$values))
      return
    }
    toast.error(resData.message || 'Get all category fail')
  } catch (e) {
    toast.error(e.response.data.message || 'Get all category fail')
  }
}
export default function* categorySaga() {
  yield takeEvery('GET_ALL_CATEGORY_SAGA', getAllCategory)
}
