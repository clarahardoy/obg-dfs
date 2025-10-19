import { apiClient } from './api-client';

export const searchBooks = async () => {
	const response = await apiClient.get('/books/search');
	return response.data;
};

export const searchBooksByFilter = async (id) => {
	const response = await apiClient.get(`/books/search/advanced${id}`);
	return response.data;
};

export const getBookFromApiById = async (googleBooksId) => {
	const response = await apiClient.get(`/books/google/${googleBooksId}`);
	return response.data;
};
