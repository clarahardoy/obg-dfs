import { apiClient } from './api-client';

export const searchBooks = async (query) => {
	try {
		const response = await apiClient.get('/books/search', {
			params: { q: query },
		});
		return response.data;
	} catch (error) {
		console.error('No se pudieron obtener los libros:', error);
		throw error;
	}
};

export const searchBooksByFilter = async (id) => {
	try {
		const response = await apiClient.get(`/books/search/advanced${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudieron obtener los libros por filtro:', error);
		throw error;
	}
};

export const getBookFromApiById = async (googleBooksId) => {
	try {
		const response = await apiClient.get(`/books/google/${googleBooksId}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo obtener el libro de la API:', error);
		throw error;
	}
};
