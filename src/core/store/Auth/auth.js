import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    fullName: localStorage.getItem("fullName") || "",
    roleName: localStorage.getItem("roleName") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            const { accessToken, refreshToken, fullName, roleName } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.fullName = fullName;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("fullName", fullName);
            localStorage.setItem("roleName", roleName);
        },
        clearToken: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            state.fullName = "";
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("fullName");
            localStorage.removeItem("roleName");
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
