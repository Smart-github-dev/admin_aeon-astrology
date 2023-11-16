// import { createStore } from 'redux'

import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducer/usersReducer'
import notificationsReducer from './reducer/notificationsReducer'
import authReducer from './reducer/authReducer'
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})

export default store
