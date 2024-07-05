import { toast } from 'sonner'
import { call, put, takeEvery } from 'redux-saga/effects'
import designApi from './designApi'
import { designActions } from './designSlice'

function* getAllDesign() {
  try {
    const resData = yield call(designApi.getAllDesign)
    if (resData) {
      yield put(designActions.setDesignList(resData.$values))
      return
    }
    toast.error(resData.message || 'Get all design fail')
  } catch (e) {
    toast.error(e.response.data.message || 'Get all design fail')
  }
}
export default function* designSaga() {
  yield takeEvery('GET_LIST_DESIGN_SAGA', getAllDesign)
}
