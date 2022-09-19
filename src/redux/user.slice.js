import { createSlice } from '@reduxjs/toolkit';

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
      };
    },
    updateDuser(state, action) {
      return {
        ...state,
        loading: action.payload.loading,
      };
    },
    getUsersStart(state) {
      return {
        ...state,
        items: [],
        totalElements: 0,
        loading: true,
      };
    },
    getAllUsers(state, action) {
      return {
        ...state,
        items: action.payload.items,
        totalElements: action.payload.totalElements,
        loading: action.payload.loading,
      };
    },
    deleteUser(state, action) {
      return {
        ...state,
        loading: action.payload.loading,
      };
    },
  },
});

export const { addUser, getUsersStart, getAllUsers } = userSlice.actions;

export default userSlice.reducer;
