import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isAuth: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true
    },
    logout: (state) => {
      state.isAuth = false
      localStorage.removeItem('auth-token')
    },
  },
})

// Action creators are generated for each case reducer function
export const authAction = authSlice.actions

export default authSlice.reducer
