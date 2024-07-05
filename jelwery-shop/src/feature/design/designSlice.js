import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listDesign: [],
}

export const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    setDesignList: (state, action) => {
      state.listDesign = action.payload
    },
    addNewDesign: (state, action) => {
      state.listDesign.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const designActions = designSlice.actions

export default designSlice.reducer
