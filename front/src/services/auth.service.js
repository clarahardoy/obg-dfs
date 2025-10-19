import { apiClient } from './api-client';

export const login = async (email, password) => {
	const response = await apiClient.post('/auth/login', { email, password });
	return response.data;
};

export const register = async (email, password) => {
	const response = await apiClient.post('/auth/register', { email, password });
	return response.data;
};
