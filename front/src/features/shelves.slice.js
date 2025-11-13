import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
	shelves: [],
	allReadingsByShelf: {},
	readingsByShelf: {},
	currentFilter: {},
});

const initialState = getInitialState();

export const shelvesSlice = createSlice({
	name: 'shelves',
	initialState,
	reducers: {
		setShelves: (state, action) => {
			state.shelves = action.payload;
		},
		setAllShelfReadings: (state, action) => {
			const { shelfId, readings } = action.payload;
			state.allReadingsByShelf[shelfId] = readings ?? [];
		},
		setShelfReadings: (state, action) => {
			const { shelfId, readings } = action.payload;
			state.readingsByShelf[shelfId] = readings ?? [];
		},
		setShelfFilter: (state, action) => {
			const { shelfId, filter } = action.payload;
			state.currentFilter[shelfId] = filter;
		},
		addReadingToShelf: (state, action) => {
			const { shelfId, reading } = action.payload;
			const all = state.allReadingsByShelf[shelfId] ?? [];
			const filtered = state.readingsByShelf[shelfId] ?? [];
			state.allReadingsByShelf[shelfId] = [...all, reading];
			state.readingsByShelf[shelfId] = [...filtered, reading];
		},
		deleteReadingFromShelf: (state, action) => {
			const { shelfId, readingId } = action.payload;
			const all = state.allReadingsByShelf[shelfId];
			if (Array.isArray(all)) {
				state.allReadingsByShelf[shelfId] = all.filter(
					(r) => r._id !== readingId
				);
			}
			const filtered = state.readingsByShelf[shelfId];
			if (Array.isArray(filtered)) {
				state.readingsByShelf[shelfId] = filtered.filter(
					(r) => r._id !== readingId
				);
			}
		},
		updateReadingInShelf: (state, action) => {
			const { shelfId, readingId, updatedReading } = action.payload;

			const all = state.allReadingsByShelf[shelfId];
			if (Array.isArray(all)) {
				state.allReadingsByShelf[shelfId] = all.map((r) =>
					r._id === readingId ? updatedReading : r
				);
			}
			const filtered = state.readingsByShelf[shelfId];
			if (Array.isArray(filtered)) {
				state.readingsByShelf[shelfId] = filtered.map((r) =>
					r._id === readingId ? updatedReading : r
				);
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
			if (!shelfId) return;

			state.shelves = state.shelves.filter((shelf) => shelf._id !== shelfId);
			delete state.allReadingsByShelf[shelfId];
			delete state.readingsByShelf[shelfId];
			delete state.currentFilter[shelfId];
		},
		resetShelves: () => getInitialState(),
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