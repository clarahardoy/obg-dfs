import { apiClient } from './api-client';

export const getUserById = async (id) => {
	const response = await apiClient.get(`/users/${id}`);
	return response.data;
};

export const getUsers = async () => {
	const response = await apiClient.get('/users');
	return response.data;
};

export const updateUser = async (id, user) => {
	const response = await apiClient.put(`/users/${id}`, user);
	return response.data;
};

export const deleteUser = async (id) => {
	const response = await apiClient.delete(`/users/${id}`);
	return response.data;
};
