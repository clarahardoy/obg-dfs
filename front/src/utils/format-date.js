export const formatDateForInput = (date) => {
	if (!date) return '';
	try {
		const dateObj = new Date(date);
		return dateObj.toISOString().split('T')[0];
	} catch {
		return '';
	}
};
