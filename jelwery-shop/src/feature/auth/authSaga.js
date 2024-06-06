import { call, takeEvery } from 'redux-saga/effects'
import { authAction } from './authSlice'
import authAPI from './authApi'
import { jwtDecode } from 'jwt-decode'

function* authRequest(action) {
 const resData = yield call(authAPI.login,action.payload)
 localStorage.setItem('auth-token')
 console.log(jwtDecode(resData.data))
}

function* registerRequest(action) {
  const resData = yield call(authAPI.signIn,action.payload)
  console.log(resData)
 }
export default function* authSaga() {
  yield takeEvery('LOGIN_SAGA', authRequest)
  yield takeEvery('REGISTER_SAGE', registerRequest)
}
