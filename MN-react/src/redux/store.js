import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'
import dataSlice from './slices/dataSlice'
const reducer = {
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
  rtkData: dataSlice,
}
const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store