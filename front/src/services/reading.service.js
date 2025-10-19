import { apiClient } from './api-client';

export const getAllReadings = async () => {
	const response = await apiClient.get('/readings');
	return response.data;
};

export const getReadingById = async (id) => {
	const response = await apiClient.get(`/readings/${id}`);
	return response.data;
};

export const createReading = async (reading) => {
	const response = await apiClient.post('/readings', reading);
	return response.data;
};

export const updateReadingById = async (id, reading) => {
	const response = await apiClient.put(`/readings/${id}`, reading);
	return response.data;
};

export const deleteReadingById = async (id) => {
	const response = await apiClient.delete(`/readings/${id}`);
	return response.data;
};
