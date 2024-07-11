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
    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }
    },
    setAllUser: (state, action) => {
      state.listUser = action.payload
    },
    updateUser: (state, action) => {
      const { userID, dataUpdate } = action.payload
      const updateUser = state.listUser.map((user) => {
        if (user.userID === userID) {
          return { ...user, ...dataUpdate }
        }
        return user
      })
      state.listUser = updateUser
    },
    addNewUser: (state, action) => {
      state.listUser.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const authAction = authSlice.actions

export default authSlice.reducer
