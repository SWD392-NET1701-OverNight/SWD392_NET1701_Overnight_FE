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
    updateDesign: (state, action) => {
      const { id, designID } = action.payload
      const requestItem = state.listRequest.find((item) => item.id === id)
      requestItem.designID = designID
    },
  },
})

// Action creators are generated for each case reducer function
export const requestActions = requestSlice.actions

export default requestSlice.reducer
