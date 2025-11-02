export const ReadingStatus = {
	WANT_TO_READ: 'WANT_TO_READ',
	CURRENTLY_READING: 'CURRENTLY_READING',
	FINISHED: 'FINISHED',
	ABANDONED: 'ABANDONED',
};

export const getStatusLabel = (status) => {
	switch (status) {
		case ReadingStatus.WANT_TO_READ:
			return 'POR LEER';
		case ReadingStatus.CURRENTLY_READING:
			return 'LEYENDO';
		case ReadingStatus.FINISHED:
			return 'COMPLETADO';
		case ReadingStatus.ABANDONED:
			return 'ABANDONADO';
		default:
			return status;
	}
};
