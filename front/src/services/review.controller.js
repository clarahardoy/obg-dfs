import { apiClient } from './api-client';

export const getAllReviews = async () => {
	const response = await apiClient.get('/reviews');
	return response.data;
};

export const getReviewById = async (id) => {
	const response = await apiClient.get(`/reviews/${id}`);
	return response.data;
};

export const createReview = async (review) => {
	const response = await apiClient.post('/reviews', review);
	return response.data;
};

export const deleteReview = async (id) => {
	const response = await apiClient.delete(`/reviews/${id}`);
	return response.data;
};
