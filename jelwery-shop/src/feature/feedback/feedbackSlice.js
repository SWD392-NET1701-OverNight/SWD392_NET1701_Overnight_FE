import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  listFeedback: [],
}

export const feedbacklSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setListFeedback: (state, action) => {
      state.listFeedback = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const feedbackActions = feedbacklSlice.actions

export default feedbacklSlice.reducer
