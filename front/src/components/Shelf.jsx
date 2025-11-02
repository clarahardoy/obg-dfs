import '../styles/shelf.css';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
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
} from '../features/shelves.slice';
import { getReadingsInShelf } from '../services/shelf.service';
import { toast } from 'react-toastify';
import { MembershipTypes } from '../utils/membership-types.js';
import { LoaderCircle } from 'lucide-react';
import { ReadingFilter, filterReadingsByDate } from '../utils/reading-filter';

const Shelf = ({ shelf }) => {
	const dispatch = useDispatch();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isAddReadingOpen, setIsAddReadingOpen] = useState(false);
	const [isLoadingReadings, setIsLoadingReadings] = useState(false);

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

	const handleAddReading = async (reading) => {
		try {
			const newReading = await createReading(reading);
			setIsAddReadingOpen(false);
			setIsExpanded(false);
			toast.success('Lectura agregada correctamente');
			dispatch(addReadingToShelf({ shelfId: shelf._id, reading: newReading }));
		} catch (error) {
			if (maxReadingsReached) {
				return toast.error(
					'Has alcanzado el límite de lecturas permitidas. Pasate a Premium para agregar más lecturas'
				);
			}
			console.error('No se pudo agregar la lectura:', error);
			return toast.error('No se pudo agregar la lectura');
		}
	};

	const handleFilterClick = (filter) => {
		// FILTRAR LOCAL DESDE EL STORE
		const filtered = filterReadingsByDate(allReadings, filter);
		dispatch(setShelfReadings({ shelfId: shelf._id, readings: filtered }));
		dispatch(setShelfFilter({ shelfId: shelf._id, filter }));
	};

	const maxReadingsReached =
		allReadings.length == maxReadingsAllowed &&
		userMembership == MembershipTypes.BASIC;

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
					<button className='btn btn-ghost btn-sm' onClick={handleOpenModal}>
						<Plus className='h-4 w-4' />
						Agregar reading
					</button>
				</div>

				{isExpanded && (
					<>
						<div className='shelf-filters'>
							<button
								className={`btn btn-sm ${
									currentFilter === ReadingFilter.VER_TODOS
										? 'btn-default'
										: 'btn-ghost'
								}`}
								onClick={() => handleFilterClick(ReadingFilter.VER_TODOS)}
							>
								Ver todos
							</button>
							<button
								className={`btn btn-sm ${
									currentFilter === ReadingFilter.ULTIMA_SEMANA
										? 'btn-default'
										: 'btn-ghost'
								}`}
								onClick={() => handleFilterClick(ReadingFilter.ULTIMA_SEMANA)}
							>
								Terminados (Última semana)
							</button>
							<button
								className={`btn btn-sm ${
									currentFilter === ReadingFilter.ULTIMO_MES
										? 'btn-default'
										: 'btn-ghost'
								}`}
								onClick={() => handleFilterClick(ReadingFilter.ULTIMO_MES)}
							>
								Terminados (Último mes)
							</button>
							<button
								className={`btn btn-sm ${
									currentFilter === ReadingFilter.HISTORICO
										? 'btn-default'
										: 'btn-ghost'
								}`}
								onClick={() => handleFilterClick(ReadingFilter.HISTORICO)}
							>
								Terminados (Histórico)
							</button>
						</div>

						<div className='shelf-readings'>
							{filteredReadings.length === 0 && (
								<div className='shelf-readings-empty'>
									<p>Actualmente no tienes ninguna lectura.</p>
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
		</>
	);
};

export default Shelf;
