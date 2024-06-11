import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'
import requestApi from './requestApi'
import { requestAction } from './requestSlice'

function* getAllRequest() {
  try {
    const resData = yield call(requestApi.getAllRequest)
    console.log(resData)
    yield put(requestAction.setListRequest(resData))
  } catch (error) {
    toast.error('Create request failed')
  }
}

export default function* requestSaga() {
  yield takeEvery('GET_ALL_REQUEST_SAGA', getAllRequest)
}
