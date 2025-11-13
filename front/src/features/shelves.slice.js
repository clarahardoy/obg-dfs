import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	shelves: [],
	allReadingsByShelf: [], // Store all readings without filter
	readingsByShelf: [],    // Store filtered readings for display
	currentFilter: [],      // Track current filter per shelf
};

export const shelvesSlice = createSlice({
	name: 'shelves',
	initialState,
	reducers: {
		setShelves: (state, action) => {
			state.shelves = action.payload;
		},
		setAllShelfReadings: (state, action) => {
			const { shelfId, readings } = action.payload;
			state.allReadingsByShelf[shelfId] = readings;
		},
		setShelfReadings: (state, action) => {
			const { shelfId, readings } = action.payload;
			state.readingsByShelf[shelfId] = readings;
		},
		setShelfFilter: (state, action) => {
			const { shelfId, filter } = action.payload;
			state.currentFilter[shelfId] = filter;
		},
		addReadingToShelf: (state, action) => {
			const { shelfId, reading } = action.payload;
			if (state.allReadingsByShelf[shelfId]) {
				state.allReadingsByShelf[shelfId].push(reading);
			} else {
				state.allReadingsByShelf[shelfId] = [reading];
			}
			if (state.readingsByShelf[shelfId]) {
				state.readingsByShelf[shelfId].push(reading);
			} else {
				state.readingsByShelf[shelfId] = [reading];
			}
		},
		deleteShelfFromList: (state, action) => {
			const shelfId = action.payload;
			if (!shelfId) return;

			state.shelves = state.shelves.filter((shelf) => shelf._id !== shelfId);

			if (state.allReadingsByShelf[shelfId]) {
				delete state.allReadingsByShelf[shelfId];
			}
			if (state.readingsByShelf[shelfId]) {
				delete state.readingsByShelf[shelfId];
			}
			if (state.currentFilter[shelfId]) {
				delete state.currentFilter[shelfId];
			}
		},
		updateReadingInShelf: (state, action) => {
			const { shelfId, readingId, updatedReading } = action.payload;
			const allReadings = state.allReadingsByShelf[shelfId];
			if (allReadings) {
				const allIndex = allReadings.findIndex(
					(reading) => reading._id === readingId
				);
				if (allIndex !== -1) {
					allReadings[allIndex] = updatedReading;
				}
			}
			const filteredReadings = state.readingsByShelf[shelfId];
			if (filteredReadings) {
				const filteredIndex = filteredReadings.findIndex(
					(reading) => reading._id === readingId
				);
				if (filteredIndex !== -1) {
					filteredReadings[filteredIndex] = updatedReading;
				}
			}
		},
		addShelfToList: (state, action) => {
			const shelf = action.payload;
			if (!shelf || !shelf._id) return;
			state.shelves.push(shelf);
		},
		updateShelfInList: (state, action) => {
			const { shelfId, name } = action.payload;
			const shelf = state.shelves.find((s) => s._id === shelfId);
			if (shelf) {
				shelf.name = name;
			}
		},
		deleteShelfFromList: (state, action) => {
			const shelfId = action.payload;
			state.shelves = state.shelves.filter((shelf) => shelf._id !== shelfId);
			delete state.allReadingsByShelf[shelfId];
			delete state.readingsByShelf[shelfId];
			delete state.currentFilter[shelfId];
		},
		resetShelves: () => initialState,
	},
});

export const {
	setShelves,
	setAllShelfReadings,
	setShelfReadings,
	setShelfFilter,
	addReadingToShelf,
	deleteReadingFromShelf,
	updateReadingInShelf,
	addShelfToList,
	updateShelfInList,
	deleteShelfFromList,
	resetShelves,
} = shelvesSlice.actions;
export default shelvesSlice.reducer;