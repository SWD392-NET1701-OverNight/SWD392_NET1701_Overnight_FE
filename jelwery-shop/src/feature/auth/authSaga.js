import { takeEvery } from 'redux-saga/effects'
import { authAction } from './authSlice'

function* authRequest(action) {
  console.log(action, 'saga')
}
export default function* authSaga() {
  yield takeEvery(authAction.login, authRequest)
}
