import { apiClient } from './api-client';

export const getUserById = async (id) => {
	try {
		const response = await apiClient.get(`/users/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo obtener el usuario:', error);
		throw error;
	}
};

export const getUsers = async () => {
	try {
		const response = await apiClient.get('/users');
		return response.data;
	} catch (error) {
		console.error('No se pudieron obtener los usuarios:', error);
		throw error;
	}
};

export const updateUser = async (id, user) => {
	try {
		const response = await apiClient.put(`/users/${id}`, user);
		return response.data;
	} catch (error) {
		console.error('No se pudo actualizar el usuario:', error);
		throw error;
	}
};

export const deleteUser = async (id) => {
	try {
		const response = await apiClient.delete(`/users/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo eliminar el usuario:', error);
		throw error;
	}
};
