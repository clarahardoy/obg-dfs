import { apiClient } from './api-client';

export const getUserShelves = async () => {
	const response = await apiClient.get('/shelves/my-shelves');
	return response.data;
};

export const createShelf = async (name) => {
	const response = await apiClient.post('/shelves', { name });
	return response.data;
};

export const updateShelf = async (id, name) => {
	const response = await apiClient.patch(`/shelves/${id}`, { name });
	return response.data;
};

export const deleteShelf = async (id) => {
	const response = await apiClient.delete(`/shelves/${id}`);
	return response.data;
};

export const getReadingsInShelf = async (id) => {
	const response = await apiClient.get(`/shelves/${id}/readings`);
	return response.data;
};

export const addReadingToShelf = async (googleBooksId, shelfId) => {
	const response = await apiClient.post(`/shelves/readings`, {
		googleBooksId,
		shelfId,
	});
	return response.data;
};
