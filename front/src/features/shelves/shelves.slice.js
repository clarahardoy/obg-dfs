import { createSlice } from '@reduxjs/toolkit';

export const shelvesSlice = createSlice({
	name: 'shelves',
	initialState: {
		shelves: [],
	},
	reducers: {
		setShelves: (state, action) => {
			state.shelves = action.payload;
		},
	},
});

export const { setShelves } = shelvesSlice.actions;

export default shelvesSlice.reducer;
