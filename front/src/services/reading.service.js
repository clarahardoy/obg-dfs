import { apiClient } from './api-client';

export const getAllReadings = async () => {
	try {
		const response = await apiClient.get('/readings');
		return response.data;
	} catch (error) {
		console.error('No se pudieron obtener las lecturas:', error);
		throw error;
	}
};

export const getReadingById = async (id) => {
	try {
		const response = await apiClient.get(`/readings/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo obtener la lectura:', error);
		throw error;
	}
};

export const createReading = async (reading) => {
	try {
		const response = await apiClient.post('/readings', reading);
		return response.data.newReading;
	} catch (error) {
		console.error('No se pudo crear la lectura:', error);
		throw error;
	}
};

export const updateReadingById = async (id, reading) => {
	try {
		const response = await apiClient.patch(`/readings/${id}`, reading);
		return response.data;
	} catch (error) {
		console.error('No se pudo actualizar la lectura:', error);
		throw error;
	}
};

export const deleteReadingById = async (id) => {
	try {
		const response = await apiClient.delete(`/readings/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo eliminar la lectura:', error);
		throw error;
	}
};
