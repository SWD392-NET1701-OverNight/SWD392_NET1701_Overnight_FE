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
  },
})

// Action creators are generated for each case reducer function
export const requestAction = requestSlice.actions

export default requestSlice.reducer
