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
      const userInfo = { userName, userID: userId, roleID: Number(role) }
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
    const resData = yield call(authAPI.getUserById, action.payload)

    if (resData) {
      yield put(authAction.login(resData))
      return
    }
    toast.error(resData.message || 'Get user failed')
  } catch (e) {
    toast.error(e.response.data.message || 'Get user failed')
  }
}
function* getAllUser() {
  try {
    const resData = yield call(authAPI.getAllUser)
    if (resData) {
      yield put(authAction.setAllUser(resData.$values))
      return
    }
    toast.error(resData.message || 'Get all user failed')
  } catch (e) {
    toast.error(e.response.data.message || 'Get all user failed')
  }
}
export default function* authSaga() {
  yield takeEvery('LOGIN_SAGA', authRequest)
  yield takeEvery('GET_USER_BY_ID_SAGA', getUserById)
  yield takeEvery('GET_ALL_USER_SAGA', getAllUser)
}
