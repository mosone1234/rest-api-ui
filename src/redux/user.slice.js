import { createSlice } from '@reduxjs/toolkit'
import { addNotification } from './notification.slice'
import axios from 'axios'

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: [],
    totalElements: 0,
    loading: false,
  },
  reducers: {
    addUser(state, action) {
      return {
        ...state,
        loading: action.payload.loading,
      }
    },
    updateDuser(state, action) {
      return {
        ...state,
        loading: action.payload.loading,
      }
    },
    getUsersStart(state) {
      return {
        ...state,
        items: [],
        totalElements: 0,
        loading: true,
      }
    },
    getAllUsers(state, action) {
      return {
        ...state,
        items: action.payload.items,
        totalElements: action.payload.totalElements,
        loading: action.payload.loading,
      }
    },
    deleteUser(state, action) {
      return {
        ...state,
        loading: action.payload.loading,
      }
    },
  },
})

export const { addUser, getUsersStart, getAllUsers } = userSlice.actions

export default userSlice.reducer

export const getUsers = (skip, limit) => {
  return async (dispatch) => {
      dispatch(getUsersStart())
      try {
          const response = await axios.get(process.env.REACT_APP_USERS_URL + "?skip=" + skip + "&limit=" + limit)
          const responseTotal = await axios.get(process.env.REACT_APP_USERS_URL)
          dispatch(getAllUsers({ items: response.data, totalElements: responseTotal.data.length, loading: false}))
          dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 7000}))
      } catch (error) {
          dispatch(addNotification({open: true, type: "error", message: "Error: Error", timeout: 7000}))
      }
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
      dispatch(getUsersStart())
      try {
          const { data } = await axios.post(process.env.REACT_APP_USERS_URL, user)
          dispatch(getUsers(0, 10))
          dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 7000}))
      } catch (error) {
          dispatch(addNotification({open: true, type: "success", message: "Error: Error", timeout: 7000}))
      }
  }
}

export const updateUser = (user) => {
  return async (dispatch) => {
      dispatch(getUsersStart())
      try {
          const { data } = await axios.put(process.env.REACT_APP_USERS_URL + "/" + user._id, user)
          dispatch(getUsers(0, 10))
          dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 7000}))
      } catch (error) {
          dispatch(addNotification({open: true, type: "success", message: "Error: Error", timeout: 7000}))
      }
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
      dispatch(getUsersStart())
      try {
          const response = await axios.delete(process.env.REACT_APP_USERS_URL + "/" + id)
          dispatch(getUsers(0, 10))
          dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 7000}))
      } catch (error) {
          dispatch(addNotification({open: true, type: "success", message: "Error: Error", timeout: 7000}))
      }
  }
}
