import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPagesRead: 0,
    mostReadGenre: null,
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.totalPagesRead = action.payload.totalPagesRead;
            state.mostReadGenre = action.payload.mostReadGenre;
        },
        deleteStats: (state) => {
            state.totalPagesRead = 0;
            state.mostReadGenre = null;
        },
    },
});

export const { setStats, deleteStats } = statsSlice.actions;
export default statsSlice.reducer;