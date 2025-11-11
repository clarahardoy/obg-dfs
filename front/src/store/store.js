import { configureStore } from '@reduxjs/toolkit';
import shelvesReducer from '../features/shelves.slice.js';
import authReducer from '../features/auth.slice.js';
import statsReducer from '../features/stats.slice.js';

export const store = configureStore({
	reducer: {
		stats: statsReducer,
		shelves: shelvesReducer,
		auth: authReducer,
	},
});