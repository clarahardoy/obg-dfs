import { apiClient } from './api-client';

export const loginService = async (email, password) => {
	try {
		const response = await apiClient.post('/auth/login', { email, password });
		return response.data;
	} catch (error) {
		console.error('No se pudo iniciar sesión:', error);
		throw error;
	}
};

export const registerService = async (email, password) => {
	try {
		const response = await apiClient.post('/auth/register', {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error('No se pudo registrar el usuario:', error);
		throw error;
	}
};
