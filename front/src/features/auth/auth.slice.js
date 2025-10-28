import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logged: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loguear: (state) => {
            state.logged = true;
        },
        desloguear: (state) => {
            state.logged = false;
        }
    },
});

export const { loguear, desloguear } = authSlice.actions;

export default authSlice.reducer;