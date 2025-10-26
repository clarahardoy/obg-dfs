import { useEffect, useState } from 'react';
import { getReadingsInShelf } from '../services/shelf.service';
import Reading from './Reading';

const ReadingList = ({ shelfId }) => {
	const [readings, setReadings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchReadings = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const readingsData = await getReadingsInShelf(shelfId);
				setReadings(readingsData);
			} catch (err) {
				console.error('Error fetching readings:', err);
				setError('Error al cargar las lecturas');
			} finally {
				setIsLoading(false);
			}
		};

		fetchReadings();
	}, [shelfId]);

	if (isLoading) {
		return (
			<div
				className='text-center py-8'
				style={{ color: 'var(--marronOscuro)' }}
			>
				Cargando lecturas...
			</div>
		);
	}

	if (error) {
		return (
			<div className='text-center py-8 mensaje-error visible'>{error}</div>
		);
	}

	if (readings.length === 0) {
		return (
			<div className='text-center py-8' style={{ color: 'var(--gris)' }}>
				No hay lecturas en esta estantería
			</div>
		);
	}

	return (
		<div className='space-y-3'>
			<h4
				className='text-md font-semibold mb-3'
				style={{ color: 'var(--marronOscuro)' }}
			>
				Lecturas ({readings.length})
			</h4>
			<ul className='space-y-2'>
				{readings.map((reading) => (
					<Reading key={reading.id} reading={reading} />
				))}
			</ul>
		</div>
	);
};

export default ReadingList;
