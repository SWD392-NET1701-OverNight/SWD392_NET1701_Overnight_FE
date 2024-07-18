import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listMaterial: [],
}

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setMaterial: (state, action) => {
      state.listMaterial = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const materialAction = materialSlice.actions

export default materialSlice.reducer
