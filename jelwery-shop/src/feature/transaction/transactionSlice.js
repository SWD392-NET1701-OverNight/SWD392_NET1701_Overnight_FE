import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactionDetail: [],
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionDetail: (state, action) => {
      state.transactionDetail = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const transactionActions = transactionSlice.actions

export default transactionSlice.reducer
