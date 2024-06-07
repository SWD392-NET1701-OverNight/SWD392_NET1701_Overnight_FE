import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'
import requestApi from './requestApi'
import { requestAction } from './requestSlice'

function* createRequest(action) {
  try {
    const res = yield call(requestApi.createRequest, action.payload.data, action.payload.userId)
    if (res.status === 200) {
      toast.success('Create request successfully')
    }
  } catch (error) {
    toast.error('Create request failed')
  }
}
function* getRequestById(action) {
  try {
    const res = yield call(requestApi.getListRequestByUserId, action.payload)
    console.log(res)
    // if (res.status === 200) {
    //   yield put(requestAction.setListRequest(res.data))
    // }
  } catch (error) {
    toast.error('Get request failed')
  }
}
export default function* requestSaga() {
  yield takeEvery('CREATE_REQUEST_SAGA', createRequest)
  yield takeEvery('GET_REQUEST_BY_ID_SAGA', getRequestById)
}
