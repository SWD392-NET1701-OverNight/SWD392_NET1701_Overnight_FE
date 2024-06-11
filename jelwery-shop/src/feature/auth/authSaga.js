import { call, put, takeEvery } from 'redux-saga/effects'
import { authAction } from './authSlice'
import authAPI from './authApi'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

function* authRequest(action) {
  try {
    const resData = yield call(authAPI.login, action.payload)
    if (resData.data) {
      localStorage.setItem('auth-token', resData.data)
      const data = jwtDecode(resData.data)
      toast.success(resData.message)
      const userInfo = { userName: data['userName'], userId: data.userId }
      yield put(authAction.login(userInfo))
      return
    }
    toast.error(resData.message)
  } catch (e) {
    toast.error(e.response.data.message)
  }
}

export default function* authSaga() {
  yield takeEvery('LOGIN_SAGA', authRequest)
}
