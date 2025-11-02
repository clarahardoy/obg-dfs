import { ReadingStatus } from './reading-status';

export const calculateProgress = (reading) => {
	if (reading.status !== ReadingStatus.CURRENTLY_READING) return null;
	if (reading.book.pages === 0) return null;
	return Math.round((reading.currentPage / reading.book.pages) * 100);
};
