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
      const { userName, userId, role } = jwtDecode(resData.data)
      toast.success(resData.message || 'Login success')
      const userInfo = { userName, userId, role }
      yield put(authAction.login(userInfo))
      return
    }
    toast.error(resData?.message || 'Login failed')
  } catch (e) {
    toast.error(e?.response?.data?.message || 'Login failed')
  }
}
function* getUserById(action) {
  try {
    const resData = yield call(authAPI.getUerById, action.payload)

    if (resData) {
      yield put(authAction.login(resData))
      return
    }
    toast.error(resData.message || 'Get user failed')
  } catch (e) {
    toast.error(e.response.data.message || 'Get user failed')
  }
}

export default function* authSaga() {
  yield takeEvery('LOGIN_SAGA', authRequest)
  yield takeEvery('GET_USER_BY_ID_SAGA', getUserById)
}
