import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	authenticated: false,
	token: null,
	role: null,
	maxReadings: Number(localStorage.getItem('maxReadings')) || 10,
	membership: localStorage.getItem('membership') || 'BASIC',
	avatarUrl: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loguear: (state, action) => {
			state.authenticated = true;
			state.token = action.payload.token;
			state.role = action.payload.role;
			state.maxReadings = action.payload.maxReadings;
			state.membership = action.payload.membership;
			state.avatarUrl = action.payload.avatarUrl || null;
		},
		desloguear: () => {
			return initialState;
		},
		setMembership(state, action) {
			state.membership = action.payload.membership;
			if (typeof action.payload.maxReadings !== 'undefined') {
				state.maxReadings = action.payload.maxReadings;
			}
		},
	},
});

export const { loguear, desloguear, setMembership } = authSlice.actions;
export default authSlice.reducer;