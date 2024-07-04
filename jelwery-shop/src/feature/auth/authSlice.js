import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listUser: [],
  currentUser: null,
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      localStorage.removeItem('auth-token')
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }
    },
    setAllUser: (state, action) => {
      state.listUser = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const authAction = authSlice.actions

export default authSlice.reducer
