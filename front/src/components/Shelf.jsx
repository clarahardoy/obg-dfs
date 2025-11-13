import '../styles/shelf.css';
import { Plus, ChevronDown, ChevronUp, LoaderCircle, Pencil, Trash2 } from 'lucide-react';
import Reading from './Reading';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddReading } from './reading/AddReading';
import { createReading } from '../services/reading.service';
import {
	addReadingToShelf,
	setAllShelfReadings,
	setShelfReadings,
	setShelfFilter,
	updateShelfInList,
	deleteShelfFromList,
} from '../features/shelves.slice';
import { getReadingsInShelf, updateShelf, deleteShelf } from '../services/shelf.service';
import { toast } from 'react-toastify';
import { MembershipTypes } from '../utils/membership-types.js';
import { ReadingFilter, filterReadingsByDate } from '../utils/reading-filter';
import { useTranslation } from 'react-i18next';
import { ShelfForm } from './ShelfForm';
import ModalConfirmacion from './ModalConfirmacion';

const Shelf = ({ shelf }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isAddReadingOpen, setIsAddReadingOpen] = useState(false);
	const [isLoadingReadings, setIsLoadingReadings] = useState(false);
	const [isEditShelfOpen, setIsEditShelfOpen] = useState(false);
	const [isDeleteShelfOpen, setIsDeleteShelfOpen] = useState(false);
	const [isDeletingShelf, setIsDeletingShelf] = useState(false);

	const allReadings = useSelector(
		(state) => state.shelves.allReadingsByShelf[shelf._id] || []
	);
	const filteredReadings = useSelector(
		(state) => state.shelves.readingsByShelf[shelf._id] || []
	);
	const currentFilter = useSelector(
		(state) => state.shelves.currentFilter[shelf._id] || ReadingFilter.VER_TODOS
	);
	const userMembership = useSelector((state) => state.auth.membership);
	const maxReadingsAllowed = useSelector((state) => state.auth.maxReadings);
	const isPremium = userMembership === MembershipTypes.PREMIUM;

	useEffect(() => {
		const fetchReadings = async () => {
			setIsLoadingReadings(true);
			const readings = await getReadingsInShelf(shelf._id);
			// GUARDAR TODAS LAS READINGS EN EL STORE (PARA FILTRO VER TODOS)
			dispatch(setAllShelfReadings({ shelfId: shelf._id, readings }));
			// FILTRO POR DEFAULT: TODAS LAS READINGS
			const ALL_READINGS = filterReadingsByDate(
				readings,
				ReadingFilter.VER_TODOS
			);
			dispatch(
				setShelfReadings({ shelfId: shelf._id, readings: ALL_READINGS })
			);
			dispatch(
				setShelfFilter({ shelfId: shelf._id, filter: ReadingFilter.VER_TODOS })
			);
			setIsLoadingReadings(false);
		};
		fetchReadings();
	}, [shelf._id, dispatch]);

	const handleOpenModal = (e) => {
		e.stopPropagation();
		setIsAddReadingOpen(true);
	};

	const handleOpenEditShelf = (e) => {
		e.stopPropagation();
		setIsEditShelfOpen(true);
	};

	const handleOpenDeleteShelf = (e) => {
		e.stopPropagation();
		setIsDeleteShelfOpen(true);
	};
	const maxReadingsReached =
		allReadings.length == maxReadingsAllowed &&
		userMembership == MembershipTypes.BASIC;

	const handleAddReading = async (reading) => {
		try {
			const newReading = await createReading(reading);
			setIsAddReadingOpen(false);
			setIsExpanded(false);
			toast.success(t('shelf.toastAddSuccess'));
			dispatch(addReadingToShelf({ shelfId: shelf._id, reading: newReading }));
		} catch (error) {
			if (maxReadingsReached) {
				return toast.error(t('shelf.toastMaxReached'));
			}
			console.error('No se pudo agregar la lectura:', error);
			return toast.error(t('shelf.toastAddError'));
		}
	};

	const handleFilterClick = (filter) => {
		// FILTRAR LOCAL DESDE EL STORE
		const filtered = filterReadingsByDate(allReadings, filter);
		dispatch(setShelfReadings({ shelfId: shelf._id, readings: filtered }));
		dispatch(setShelfFilter({ shelfId: shelf._id, filter }));
	};

	const handleUpdateShelf = async ({ name }) => {
		try {
			const updatedShelf = await updateShelf(shelf._id, name);
			dispatch(
				updateShelfInList({
					shelfId: shelf._id,
					name: updatedShelf.name,
				})
			);
			toast.success(t('shelf.toastUpdateSuccess'));
		} catch (error) {
			console.error('No se pudo actualizar la estantería:', error);
			toast.error(t('shelf.toastUpdateError'));
			throw error;
		}
	};

	const handleConfirmDeleteShelf = async () => {
		try {
			setIsDeletingShelf(true);
			await deleteShelf(shelf._id);
			dispatch(deleteShelfFromList(shelf._id));
			toast.success(t('shelf.toastDeleteSuccess'));
		} catch (error) {
			console.error('No se pudo eliminar la estantería:', error);
			toast.error(t('shelf.toastDeleteError'));
		} finally {
			setIsDeletingShelf(false);
			setIsDeleteShelfOpen(false);
		}
	};

	if (isLoadingReadings) {
		return (
			<div className='shelf-loading'>
				<LoaderCircle className='input-spinner' size={18} />
			</div>
		);
	}

	return (
		<>
			<div className='shelf'>
				<div
					className='shelf-not-expanded'
					onClick={() => setIsExpanded(!isExpanded)}
					style={{ cursor: 'pointer' }}
				>
					<div className='shelf-not-expanded-left'>
						{isExpanded ? (
							<ChevronUp className='h-5 w-5' />
						) : (
							<ChevronDown className='h-5 w-5' />
						)}
						<h2 className='shelf-title'>{shelf.name}</h2>
					</div>

					<div className='shelf-not-expanded-right'>
						<button className='btn btn-ghost btn-sm' onClick={handleOpenModal}>
							<Plus className='h-4 w-4' />
							{t('shelf.btnAddReading')}
						</button>

						{isPremium && (
							<>
								<button
									type='button'
									className='btn btn-ghost btn-sm'
									onClick={handleOpenEditShelf}
									aria-label={t('shelf.actions.edit')}
								>
									<Pencil className='h-4 w-4' />
								</button>
								<button
									type='button'
									className='btn btn-ghost btn-sm'
									onClick={handleOpenDeleteShelf}
									aria-label={t('shelf.actions.delete')}
								>
									<Trash2 className='h-4 w-4' />
								</button>
							</>
						)}
					</div>
				</div>

				{isExpanded && (
					<>
						<div className='shelf-filters'>
							<button
								className={`btn btn-sm ${currentFilter === ReadingFilter.VER_TODOS
										? 'btn-default'
										: 'btn-ghost'
									}`}
								onClick={() => handleFilterClick(ReadingFilter.VER_TODOS)}
							>
								{t('shelf.filters.showAll')}
							</button>
							<button
								className={`btn btn-sm ${currentFilter === ReadingFilter.ULTIMA_SEMANA
										? 'btn-default'
										: 'btn-ghost'
									}`}
								onClick={() =>
									handleFilterClick(ReadingFilter.ULTIMA_SEMANA)
								}
							>
								{t('shelf.filters.finishedLastWeek')}
							</button>
							<button
								className={`btn btn-sm ${currentFilter === ReadingFilter.ULTIMO_MES
										? 'btn-default'
										: 'btn-ghost'
									}`}
								onClick={() => handleFilterClick(ReadingFilter.ULTIMO_MES)}
							>
								{t('shelf.filters.finishedLastMonth')}
							</button>
							<button
								className={`btn btn-sm ${currentFilter === ReadingFilter.HISTORICO
										? 'btn-default'
										: 'btn-ghost'
									}`}
								onClick={() => handleFilterClick(ReadingFilter.HISTORICO)}
							>
								{t('shelf.filters.finishedAllTime')}
							</button>
						</div>

						<div className='shelf-readings'>
							{filteredReadings.length === 0 && (
								<div className='shelf-readings-empty'>
									<p>{t('shelf.empty.noReadings')}</p>
								</div>
							)}
							{filteredReadings.map((reading) => (
								<Reading key={reading._id} reading={reading} />
							))}
						</div>
					</>
				)}
			</div>

			<AddReading
				open={isAddReadingOpen}
				onClose={() => setIsAddReadingOpen(false)}
				shelfId={shelf._id}
				onAdd={handleAddReading}
			/>

			{isPremium && (
				<>
					<ShelfForm
						open={isEditShelfOpen}
						onClose={() => setIsEditShelfOpen(false)}
						onSubmit={handleUpdateShelf}
						defaultName={shelf.name}
					/>

					<ModalConfirmacion
						isOpen={isDeleteShelfOpen}
						onClose={() => setIsDeleteShelfOpen(false)}
						onConfirm={handleConfirmDeleteShelf}
						title={t('shelf.delete.title')}
						description={t('shelf.delete.description')}
						confirmText={t('shelf.delete.confirm')}
						cancelText={t('common.actions.cancel')}
						isDisabled={isDeletingShelf}
					/>
				</>
			)}
		</>
	);
};

export default Shelf;