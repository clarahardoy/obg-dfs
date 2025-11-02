import React, { useEffect } from 'react';
import '../../styles/reading.css';
import { ReadingStatus } from '../../utils/reading-status';

export const ReadingForm = ({
	status,
	setStatus,
	currentPage,
	setCurrentPage,
	startedReading,
	setStartedReading,
	finishedReading,
	setFinishedReading,
	maxPages,
}) => {
	const showStartDate =
		status === ReadingStatus.CURRENTLY_READING ||
		status === ReadingStatus.FINISHED;
	const showFinishDate = status === ReadingStatus.FINISHED;

	const isPageInputDisabled = status !== ReadingStatus.CURRENTLY_READING;
	const MAX_FECHA = new Date().toISOString().split('T')[0];

	useEffect(() => {
		if (status === ReadingStatus.WANT_TO_READ) {
			setCurrentPage(currentPage ?? null);
		} else if (status === ReadingStatus.FINISHED) {
			setCurrentPage(maxPages);
		} else if (status === ReadingStatus.ABANDONED) {
			setCurrentPage(currentPage ?? null);
		}
	}, [status, maxPages, setCurrentPage, currentPage]);

	return (
		<div className='reading-form'>
			<div className='form-group'>
				<label htmlFor='status' className='form-label'>
					Estado de lectura
				</label>
				<select
					id='status'
					className='form-select'
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value={ReadingStatus.WANT_TO_READ}>Por leer</option>
					<option value={ReadingStatus.CURRENTLY_READING}>Leyendo</option>
					<option value={ReadingStatus.FINISHED}>Completado</option>
					<option value={ReadingStatus.ABANDONED}>Abandonado</option>
				</select>
			</div>

			<div className='form-group'>
				<label htmlFor='currentPage' className='form-label'>
					Página actual
				</label>
				<input
					id='currentPage'
					type='number'
					className={`form-input ${
						isPageInputDisabled ? 'form-input-disabled' : ''
					}`}
					min='0'
					max={maxPages}
					value={currentPage}
					onChange={(e) => setCurrentPage(e.target.value)}
					placeholder={`0/${maxPages}`}
					disabled={isPageInputDisabled}
					required
				/>
			</div>

			{showStartDate && (
				<div className='form-group'>
					<label htmlFor='startedReading' className='form-label'>
						Fecha de inicio (opcional)
					</label>
					<input
						id='startedReading'
						type='date'
						className='form-input'
						value={startedReading || ''}
						max={MAX_FECHA}
						onChange={(e) => setStartedReading(e.target.value)}
					/>
				</div>
			)}

			{showFinishDate && (
				<div className='form-group'>
					<label htmlFor='finishedReading' className='form-label'>
						Fecha de finalización
					</label>
					<input
						id='finishedReading'
						type='date'
						className='form-input'
						value={finishedReading || ''}
						{...(startedReading && { min: startedReading })}
						max={MAX_FECHA}
						onChange={(e) => setFinishedReading(e.target.value)}
						required
					/>
				</div>
			)}
		</div>
	);
};
