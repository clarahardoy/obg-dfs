import '../styles/shelf.css';
import '../styles/reading.css';
import { BookOpen } from 'lucide-react';
import { Edit2, Trash2 } from 'lucide-react';

const Reading = ({ reading }) => {
	return (
		<div className='reading-item'>
			<div className='reading-info'>
				<div className='reading-icon'>
					<BookOpen className='h-5 w-5 text-primary' />
				</div>
				<div>
					<h3 className='reading-title'>{reading.title}</h3>
					<p className='reading-author'>{reading.author}</p>
				</div>
			</div>
			<div className='reading-actions'>
				<button className='btn btn-sm'>
					<Edit2 className='h-4 w-4' />
					Modificar
				</button>
				<button className='btn btn-sm btn-destructive'>
					<Trash2 className='h-4 w-4' />
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Reading;
