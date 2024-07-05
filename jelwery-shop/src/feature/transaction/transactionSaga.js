import { call, put, takeEvery } from 'redux-saga/effects'
import { toast } from 'sonner'
import transactionApi from './transactionApi'
import { transactionActions } from './transactionSlice'

function* getDetailTransaction(action) {
  try {
    const userId = action.payload
    const resData = yield call(transactionApi.getTransaction, userId)
    yield put(transactionActions.setTransactionDetail(resData.$values))
  } catch (error) {
    console.error('Error getDetailTransaction:', error)
  }
}

export default function* transactionSaga() {
  yield takeEvery('GET_DETAIL_TRANSACTION', getDetailTransaction)
}
