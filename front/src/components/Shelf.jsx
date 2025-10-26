import '../styles/shelf.css';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Reading from './Reading';
import { useState } from 'react';

const Shelf = ({ shelf }) => {
	const [filter, setFilter] = useState('ultima-semana');
	const [isExpanded, setIsExpanded] = useState(false);

	return (
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
				<button
					className='btn btn-ghost btn-sm'
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<Plus className='h-4 w-4' />
					Agregar reading
				</button>
			</div>

			{isExpanded && (
				<>
					<div className='shelf-filters'>
						<button
							className={`btn btn-sm ${
								filter === 'ultima-semana' ? 'btn-default' : 'btn-ghost'
							}`}
							onClick={() => setFilter('ultima-semana')}
						>
							Última semana
						</button>
						<button
							className={`btn btn-sm ${
								filter === 'ultimo-mes' ? 'btn-default' : 'btn-ghost'
							}`}
							onClick={() => setFilter('ultimo-mes')}
						>
							Último mes
						</button>
						<button
							className={`btn btn-sm ${
								filter === 'historico' ? 'btn-default' : 'btn-ghost'
							}`}
							onClick={() => setFilter('historico')}
						>
							Histórico
						</button>
					</div>

					<div className='shelf-readings'>
						{shelf.readings.map((reading) => (
							<Reading key={reading.id} reading={reading} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Shelf;
