import { apiClient } from './api-client';

export const getUserShelves = async () => {
	try {
		const response = await apiClient.get('/shelves/my-shelves');
		return response.data.shelves;
	} catch (error) {
		console.error('No se pudieron obtener las estanterías del usuario:', error);
		throw error;
	}
};

export const createShelf = async (name) => {
	try {
		const response = await apiClient.post('/shelves', { name });
		return response.data;
	} catch (error) {
		console.error('No se pudo crear la estantería:', error);
		throw error;
	}
};

export const updateShelf = async (id, name) => {
	try {
		const response = await apiClient.patch(`/shelves/${id}`, { name });
		return response.data;
	} catch (error) {
		console.error('No se pudo actualizar la estantería:', error);
		throw error;
	}
};

export const deleteShelf = async (id) => {
	try {
		const response = await apiClient.delete(`/shelves/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo eliminar la estantería:', error);
		throw error;
	}
};

export const getReadingsInShelf = async (id) => {
	try {
		const response = await apiClient.get(`/shelves/${id}/readings`);
		return response.data.readings;
	} catch (error) {
		console.error(
			'No se pudieron obtener las lecturas de la estantería:',
			error
		);
		throw error;
	}
};

export const addReadingToShelf = async (googleBooksId, shelfId, status) => {
	try {
		const response = await apiClient.post(`/shelves/readings`, {
			googleBooksId,
			shelfId,
			status,
		});
		return response.data;
	} catch (error) {
		console.error('No se pudo agregar la lectura a la estantería:', error);
		throw error;
	}
};
