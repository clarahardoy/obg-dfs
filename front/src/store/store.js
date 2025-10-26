import { configureStore } from '@reduxjs/toolkit';
import shelvesReducer from '../features/shelves/shelves.slice';

export const store = configureStore({
	reducer: {
		shelves: shelvesReducer,
	},
});
