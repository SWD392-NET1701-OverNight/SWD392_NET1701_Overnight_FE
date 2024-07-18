import { toast } from 'sonner'
import { call, put, takeEvery } from 'redux-saga/effects'
import feedbackAPI from './feedbackApi'
import { feedbackActions } from './feedbackSlice'

function* getAllFeeback() {
  try {
    const resData = yield call(feedbackAPI.getAllFeedback)
    if (resData) {
      yield put(feedbackActions.setListFeedback(resData.data.$values))
      return
    }
    toast.error(resData.message || 'Get all feedback fail')
  } catch (e) {
    toast.error(e.response.data.message || 'Get all feedback fail')
  }
}
export default function* feedbackSaga() {
  yield takeEvery('GET_LIST_FEEDBACK_SAGA', getAllFeeback)
}
