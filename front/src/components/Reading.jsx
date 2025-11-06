import '../styles/shelf.css';
import '../styles/reading.css';
import { BookOpen, Edit2, Trash2 } from 'lucide-react';
import {
	deleteReadingById,
	updateReadingById,
} from '../services/reading.service';
import {
	deleteReadingFromShelf,
	updateReadingInShelf,
	setShelfReadings,
} from '../features/shelves.slice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import ModalConfirmacion from './ModalConfirmacion';
import { useDispatch, useSelector } from 'react-redux';
import { ReadingForm } from './reading/ReadingForm';
import { calculateProgress } from '../utils/calculate-progress';
import { getStatusLabel, ReadingStatus } from '../utils/reading-status';
import { filterReadingsByDate } from '../utils/reading-filter';
import { formatDateForInput } from '../utils/format-date';
import { useTranslation } from 'react-i18next';

const Reading = ({ reading }) => {
	const { t } = useTranslation();
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
		useState(false);
	const [isEditReadingOpen, setIsEditReadingOpen] = useState(false);

	const [readingStatus, setReadingStatus] = useState(
		reading.status || ReadingStatus.WANT_TO_READ
	);
	const [currentPage, setCurrentPage] = useState(reading.currentPage || null);
	const [startedReading, setStartedReading] = useState(
		formatDateForInput(reading.startedReading)
	);
	const [finishedReading, setFinishedReading] = useState(
		formatDateForInput(reading.finishedReading)
	);

	const dispatch = useDispatch();

	const allReadings = useSelector(
		(state) => state.shelves.allReadingsByShelf[reading.shelfId] || []
	);
	const currentFilter = useSelector(
		(state) => state.shelves.currentFilter[reading.shelfId]
	);

	// LLENAR EL FORM CON LOS DATOS DE LA READING (CUANDO SE ABRE "MODIFICAR LECTURA")
	useEffect(() => {
		if (isEditReadingOpen) {
			setReadingStatus(reading.status || ReadingStatus.WANT_TO_READ);
			setCurrentPage(reading.currentPage || null);
			setStartedReading(formatDateForInput(reading.startedReading));
			setFinishedReading(formatDateForInput(reading.finishedReading));
		}
	}, [isEditReadingOpen, reading]);

	const handleEditReading = async () => {
		try {
			const updatedData = {
				status: readingStatus,
				currentPage: Number(currentPage),
				startedReading: startedReading ? startedReading : null,
				finishedReading: finishedReading ? finishedReading : null,
			};
			await updateReadingById(reading._id, updatedData);

			const fullUpdatedReading = { ...reading, ...updatedData };

			// ACTUALIZAR LA LECTURA EN EL STORE
			dispatch(
				updateReadingInShelf({
					shelfId: reading.shelfId,
					readingId: reading._id,
					updatedReading: fullUpdatedReading,
				})
			);

			// RECALCULAR FILTRO PARA VER SI LA LECTURA SIGUE CUMPLIENDO CON EL FILTRO
			const updatedAllReadings = allReadings.map((r) =>
				r._id === reading._id ? fullUpdatedReading : r
			);
			const filteredReadings = filterReadingsByDate(
				updatedAllReadings,
				currentFilter
			);
			dispatch(
				setShelfReadings({
					shelfId: reading.shelfId,
					readings: filteredReadings,
				})
			);

			setIsEditReadingOpen(false);
			toast.success(t('reading.toastUpdateSuccess'));
		} catch (error) {
			const errorMessage =
				error?.response?.data?.error || t('reading.toastUpdateErrorGeneric');
			toast.error(errorMessage);
			console.error('No se pudo actualizar la lectura:', error);
		}
	};

	const handleDeleteReading = async () => {
		try {
			await deleteReadingById(reading._id);
			toast.success(t('reading.toastDeleteSuccess'));
			dispatch(
				deleteReadingFromShelf({
					shelfId: reading.shelfId,
					readingId: reading._id,
				})
			);
		} catch (error) {
			const errorMessage =
				error?.response?.data?.error ||
				error?.message ||
				t('reading.toastDeleteErrorGeneric');
			toast.error(errorMessage);
			console.error('No se pudo eliminar la lectura:', error);
		}
	};

	const progress = calculateProgress(reading);

	return (
		<>
			<div className='reading-card'>
				<div className='reading-card-thumbnail'>
					{reading.book.thumbnail ? (
						<img
							src={reading.book.thumbnail}
							alt={reading.book.title}
							className='reading-card-image'
						/>
					) : (
						<div className='reading-card-placeholder'>
							<BookOpen className='h-12 w-12 text-primary' />
						</div>
					)}
				</div>
				<div className='reading-card-content'>
					<h3 className='reading-card-title'>{reading.book.title}</h3>
					<div className='reading-card-status-wrapper'>
						<span
							className={`reading-status-badge reading-status-${reading.status.toLowerCase()}`}
						>
							{getStatusLabel(reading.status)}
						</span>
						{progress !== null && (
							<div className='reading-progress'>
								<div className='reading-progress-bar'>
									<div
										className='reading-progress-fill'
										style={{ width: `${progress}%` }}
									/>
								</div>
								<span className='reading-progress-text'>{progress}%</span>
							</div>
						)}
					</div>
				</div>
				<div className='reading-card-actions'>
					<button
						className='btn-icon'
						onClick={() => setIsEditReadingOpen(true)}
						id='edit-reading-button'
					>
						<Edit2 className='h-4 w-4' />
					</button>
					<button
						className='btn-icon btn-destructive'
						onClick={() => setIsDeleteConfirmationOpen(true)}
						id='delete-reading-button'
					>
						<Trash2 className='h-4 w-4' />
					</button>
				</div>
			</div>
			<ModalConfirmacion
				isOpen={isDeleteConfirmationOpen}
				onClose={() => setIsDeleteConfirmationOpen(false)}
				onConfirm={handleDeleteReading}
				title={t('reading.modalDelete.title')}
				description={t('reading.modalDelete.description')}
				confirmText={t('reading.modalDelete.confirm')}
				cancelText={t('reading.modalDelete.cancel')}
			/>
			<ModalConfirmacion
				isOpen={isEditReadingOpen}
				onClose={() => setIsEditReadingOpen(false)}
				onConfirm={handleEditReading}
				title={t('reading.modalEdit.title')}
				confirmText={t('reading.modalEdit.confirm')}
				cancelText={t('reading.modalEdit.cancel')}
				className='modal-container-column'
				isDisabled={
					readingStatus === ReadingStatus.FINISHED && !finishedReading
				}
			>
				<ReadingForm
					status={readingStatus}
					setStatus={setReadingStatus}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					startedReading={startedReading}
					setStartedReading={setStartedReading}
					finishedReading={finishedReading}
					setFinishedReading={setFinishedReading}
					maxPages={reading.book.pages || 999}
				/>
			</ModalConfirmacion>
		</>
	);
};

export default Reading;