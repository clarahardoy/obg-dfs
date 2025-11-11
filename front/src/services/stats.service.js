import { apiClient } from './api-client';

export const getReadingStatsByShelf = async () => {
	try {
		const response = await apiClient.get('/stats/reading');
		return response.data;
	} catch (error) {
		console.error(
			'No se pudieron obtener las estadísticas de las lecturas:',
			error
		);
		throw error;
	}
};