import { configureStore } from '@reduxjs/toolkit';
import shelvesReducer from '../features/shelves.slice.js';
import authReducer from '../features/auth.slice.js';

export const store = configureStore({
	reducer: {
		shelves: shelvesReducer,
		auth: authReducer,
	},
});
