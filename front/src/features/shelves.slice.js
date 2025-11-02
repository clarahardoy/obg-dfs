import { createSlice } from '@reduxjs/toolkit';

export const shelvesSlice = createSlice({
	name: 'shelves',
	initialState: {
		shelves: [],
		allReadingsByShelf: {}, // Store all readings without filter
		readingsByShelf: {}, // Store filtered readings for display
		currentFilter: {}, // Track current filter per shelf
	},
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
			// Add to both all readings and filtered readings
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
		deleteReadingFromShelf: (state, action) => {
			const { shelfId, readingId } = action.payload;
			// Delete from both all readings and filtered readings
			state.allReadingsByShelf[shelfId] = state.allReadingsByShelf[
				shelfId
			].filter((reading) => reading._id !== readingId);
			state.readingsByShelf[shelfId] = state.readingsByShelf[shelfId].filter(
				(reading) => reading._id !== readingId
			);
		},
		updateReadingInShelf: (state, action) => {
			const { shelfId, readingId, updatedReading } = action.payload;
			// Update in both all readings and filtered readings
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
} = shelvesSlice.actions;

export default shelvesSlice.reducer;
