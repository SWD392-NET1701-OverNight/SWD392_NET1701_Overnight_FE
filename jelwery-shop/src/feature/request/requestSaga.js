import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'
import requestApi from './requestApi'
import { requestAction } from './requestSlice'

function* getAllRequest() {
  try {
    const resData = yield call(requestApi.getAllRequest)
    yield put(requestAction.setListRequest(resData.$values))
  } catch (error) {
    console.error('Failed to get all orders')
  }
}
function* getRequestByStatus(action) {
  try {
    const { status, role } = action.payload
    const resData = yield call(requestApi.getRequestByStatus, status, role)
    yield put(requestAction.setListRequest(resData))
  } catch (error) {
    console.error('Failed to get orders by status')
  }
}
export default function* requestSaga() {
  yield takeEvery('GET_ALL_REQUEST_SAGA', getAllRequest)
  yield takeEvery('GET_REQUEST_BY_STATUS', getRequestByStatus)
}
