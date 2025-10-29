import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loguear: (state) => {
            state.authenticated = true;
        },
        desloguear: (state) => {
            state.authenticated = false;
        }
    },
});

export const { loguear, desloguear } = authSlice.actions;

export default authSlice.reducer;