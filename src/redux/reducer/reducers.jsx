import { combineReducers } from "@reduxjs/toolkit";
import userDetail from "./userDetail";
import loginDetail from "./loginDetail";
import menuSlice from "./menuSlice";

const rootReducer = combineReducers({
    userDetail: userDetail,
    loginDetail: loginDetail,
    menuSlice: menuSlice


});

export default rootReducer;