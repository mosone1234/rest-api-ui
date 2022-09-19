import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    open: false,
    type: "info",
    message: "",
    timeout: 5000
  },
  reducers: {
    addNotification: (state, action) => ({
      ...state,
      ...action.payload,
      open: true
    }),
    clearNotification: (state) => ({ ...state, open: false })
  }
});

export const { addNotification, clearNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;