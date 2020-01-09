import { createSlice } from '@reduxjs/toolkit'

const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: false,
  reducers: {
    login: state => true,
    logout: state => false
  }
})

export const { login, logout } = loginStatusSlice.actions

export default loginStatusSlice.reducer
