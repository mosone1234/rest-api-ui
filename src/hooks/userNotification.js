import { useDispatch } from 'react-redux'
import { addNotification, clearNotification } from '../redux/notification.slice'

export const useNotification = () => {
  const dispatch = useDispatch()

  const displayNotificationHooks = (notification) => {
    dispatch(addNotification(notification))
  }

  const clearNotifificationHooks = () => {
    dispatch(clearNotification())
  }

  return { displayNotificationHooks, clearNotifificationHooks }
}