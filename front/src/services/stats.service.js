import { apiClient } from './api-client';

export const getReadingStatsByShelf = async () => {
	const response = await apiClient.get('/stats/reading');
	return response.data;
};
