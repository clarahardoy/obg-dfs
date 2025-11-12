import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	authenticated: false,
	token: null,
	role: null,
	maxReadings: 0,
	membership: null,
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
	},
});

export const { loguear, desloguear } = authSlice.actions;
export default authSlice.reducer;