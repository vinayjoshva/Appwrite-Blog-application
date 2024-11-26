import { createSlice } from "@reduxjs/toolkit";

//steps involved in slice creation: name > initialState > reducers

const initialState = {
  status: false, //initially user is not authenticated
  userData: null, //no initial users at the moment
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export { authSlice };
