import { combineReducers } from '@reduxjs/toolkit'
import loginStatusReducer from '../features/loginStatus/loginStatusSlice'

const rootReducer = combineReducers({
  loginStatus: loginStatusReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
