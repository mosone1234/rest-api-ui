import { configureStore } from '@reduxjs/toolkit';
import user from './user.slice';
import notification from './notification.slice'

const store = configureStore({
  reducer: {
    user,
    notification,
  },
});

export default store;
