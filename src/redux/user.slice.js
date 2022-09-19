import { createSlice } from '@reduxjs/toolkit'
import { addNotification } from './notification.slice'
import axios from 'axios'

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: [],
    totalElements: 0,
    loading: false,
    page: 0,
    row: 10,
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
    // PAGINACION
    changePage(state, action) {
      return {
        ...state,
        page: action.payload.page,
      }
    },
    changeRow(state, action) {
      return {
        ...state,
        row: action.payload.row
      }
    },
  },
})

export const { addUser, getUsersStart, getAllUsers, changePage, changeRow } = userSlice.actions

export default userSlice.reducer

// Obtener todos los usuarios con paginacion
export const getUsers = (skip, limit) => {
  return async (dispatch) => {
    dispatch(getUsersStart())
    try {
        const response = await axios.get(process.env.REACT_APP_USERS_URL + "?skip=" + skip + "&limit=" + limit)
        const responseTotal = await axios.get(process.env.REACT_APP_USERS_URL)
        dispatch(getAllUsers({ items: response.data, totalElements: responseTotal.data.length, loading: false}))
        dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 8000}))
    } catch (error) {
        dispatch(addNotification({open: true, type: "error", message: "Error: Error", timeout: 8000}))
    }
  }
}
// Crear usuario 
export const createUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(getUsersStart())
    dispatch(changePage({ page: 1 }))
    try {
        await axios.post(process.env.REACT_APP_USERS_URL, user)
        dispatch(changePage({ page: 0}))
        dispatch(getUsers(0, getState().user.row))
        dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 8000}))
    } catch (error) {
        dispatch(addNotification({open: true, type: "error", message: "Error: Error", timeout: 8000}))
    }
  }
}
// Actualizar usuario
export const updateUser = (user) => {
  return async (dispatch, getState) => {
    dispatch(getUsersStart())
    dispatch(changePage({ page: 1 }))
    try {
        await axios.put(process.env.REACT_APP_USERS_URL + "/" + user._id, user)
        dispatch(changePage({ page: 0}))
        dispatch(getUsers(0, getState().user.row))
        dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 8000}))
    } catch (error) {
        dispatch(addNotification({open: true, type: "error", message: "Error: Error", timeout: 8000}))
    }
  }
}
// Eliminar usuario
export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    dispatch(getUsersStart())
    dispatch(changePage({ page: 1 }))
    try {
        await axios.delete(process.env.REACT_APP_USERS_URL + "/" + id)
        dispatch(changePage({ page: 0 }))
        dispatch(getUsers(0, getState().user.row))
        dispatch(addNotification({open: true, type: "success", message: "Ok: Exito", timeout: 8000}))
    } catch (error) {
        dispatch(addNotification({open: true, type: "error", message: "Error: Error", timeout: 8000}))
    }
  }
}
