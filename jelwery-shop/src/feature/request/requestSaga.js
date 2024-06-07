import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'

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
export default function* productSaga() {
  yield takeEvery('CREATE_REQUEST_SAGA', createRequest)
}
