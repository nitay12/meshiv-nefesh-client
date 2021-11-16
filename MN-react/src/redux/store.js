import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'
const reducer = {
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
}
const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store