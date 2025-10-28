import { configureStore } from '@reduxjs/toolkit';
import shelvesReducer from '../features/shelves/shelves.slice';
import authReducer from '../features/auth/auth.slice.js';

export const store = configureStore({
	reducer: {
		shelves: shelvesReducer,
		auth: authReducer,
	},
});
