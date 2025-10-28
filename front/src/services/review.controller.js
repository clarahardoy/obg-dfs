import { apiClient } from './api-client';

export const getAllReviews = async () => {
	try {
		const response = await apiClient.get('/reviews');
		return response.data;
	} catch (error) {
		console.error('No se pudieron obtener las reseñas:', error);
		throw error;
	}
};

export const getReviewById = async (id) => {
	try {
		const response = await apiClient.get(`/reviews/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo obtener la reseña:', error);
		throw error;
	}
};

export const createReview = async (review) => {
	try {
		const response = await apiClient.post('/reviews', review);
		return response.data;
	} catch (error) {
		console.error('No se pudo crear la reseña:', error);
		throw error;
	}
};

export const deleteReview = async (id) => {
	try {
		const response = await apiClient.delete(`/reviews/${id}`);
		return response.data;
	} catch (error) {
		console.error('No se pudo eliminar la reseña:', error);
		throw error;
	}
};
