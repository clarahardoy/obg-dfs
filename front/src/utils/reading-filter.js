import { ReadingStatus } from './reading-status.js';

export const ReadingFilter = {
	VER_TODOS: 'VER_TODOS',
	ULTIMA_SEMANA: 'ULTIMA_SEMANA',
	ULTIMO_MES: 'ULTIMO_MES',
	HISTORICO: 'HISTORICO',
};

export const filterReadingsByDate = (readings, filter) => {
	if (filter === ReadingFilter.VER_TODOS) {
		return readings;
	}

	const now = new Date();
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

	return readings.filter((reading) => {
		if (reading.status !== ReadingStatus.FINISHED) {
			return false;
		}

		const finishedDate = new Date(reading.finishedReading);

		switch (filter) {
			case ReadingFilter.ULTIMA_SEMANA:
				return finishedDate >= oneWeekAgo;
			case ReadingFilter.ULTIMO_MES:
				return finishedDate >= oneMonthAgo;
			case ReadingFilter.HISTORICO:
				return true;
			default:
				return true;
		}
	});
};
