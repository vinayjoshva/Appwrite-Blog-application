import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logOutUsers().then(() => {
      dispatch(logout()); //this statement retails the important data updated in the store
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-rose-500 text-rose-400 hover:text-white rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
