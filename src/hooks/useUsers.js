import {
  useEffect
} from 'react'

// user.slice get users redux
import { getUsers } from '../redux/user.slice'
import { useDispatch, useSelector } from "react-redux"

const useUsers = () => {
  const users = useSelector((state) => state.user.items);
  const totalElements = useSelector((state) => state.user.totalElements);
  const dispatch = useDispatch();

  /** GET USERS */
  useEffect(() => {
    dispatch(getUsers(0, 10))
  }, [dispatch])

  return {
    users, totalElements
  }
}

export default useUsers
