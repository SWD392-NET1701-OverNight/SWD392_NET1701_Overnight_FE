import { call, put, takeEvery } from 'redux-saga/effects'
import { authAction } from './authSlice'
import authAPI from './authApi'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

function* authRequest(action) {
  try {
    const resData = yield call(authAPI.login, action.payload)
    localStorage.setItem('auth-token')
    const data = jwtDecode(resData.data)
    toast.success('Login success')
    const userInfo = { userName: data['unique_name'], userId: data.nameid[0] }
    yield put(authAction.login(userInfo))
  } catch (e) {
    toast.error('Login failed')
  }
}

export default function* authSaga() {
  yield takeEvery('LOGIN_SAGA', authRequest)
}
