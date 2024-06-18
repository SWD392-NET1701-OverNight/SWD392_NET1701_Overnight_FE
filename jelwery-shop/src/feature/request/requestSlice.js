import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listRequest: [],
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setListRequest: (state, action) => {
      state.listRequest = action.payload
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload
      const requestItem = state.listRequest.find((item) => item.id === id)
      requestItem.status = status
    },
  },
})

// Action creators are generated for each case reducer function
export const requestAction = requestSlice.actions

export default requestSlice.reducer
