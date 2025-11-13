import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPagesRead: 0,
    mostReadGenre: null,
    booksByGenre: [],
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setStats: (state, action) => {
            state.totalPagesRead = action.payload.totalPagesRead;
            state.mostReadGenre = action.payload.mostReadGenre;
            state.booksByGenre = action.payload.booksByGenre ?? [];
        },
        deleteStats: (state) => {
            state.totalPagesRead = 0;
            state.mostReadGenre = null;
            state.booksByGenre = [];
        },
    },
});

export const { setStats, deleteStats } = statsSlice.actions;
export default statsSlice.reducer;