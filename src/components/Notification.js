
import React from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNotification } from '../hooks/userNotification'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { clearNotifificationHooks } = useNotification()

  const handleClose = (reason) => {
    reason !== "clickaway" && clearNotifificationHooks()
  }

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
    >
      <Alert variant="outlined"
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification