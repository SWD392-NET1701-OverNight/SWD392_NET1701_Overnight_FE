import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'
import requestApi from './requestApi'
import { requestAction } from './requestSlice'

function* getAllRequest() {
  try {
    const resData = yield call(requestApi.getAllRequest)
    yield put(requestAction.setListRequest(resData))
  } catch (error) {
    console.error('Failed to get all orders')
  }
}

export default function* requestSaga() {
  yield takeEvery('GET_ALL_REQUEST_SAGA', getAllRequest)
}
