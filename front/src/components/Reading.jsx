import '../styles/shelf.css';
import '../styles/reading.css';
import { BookOpen, Edit2, Trash2 } from 'lucide-react';
import { deleteReadingById } from '../services/reading.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';

const Reading = ({ reading }) => {
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
		useState(false);

	const handleOpenDeleteConfirmation = () => {
		setIsDeleteConfirmationOpen(true);
	};

	const handleCloseDeleteConfirmation = () => {
		setIsDeleteConfirmationOpen(false);
	};

	const handleDeleteReading = async () => {
		try {
			await deleteReadingById(reading.id);
			toast.success('Lectura eliminada correctamente');
		} catch (error) {
			toast.error('No se pudo eliminar la lectura');
			console.error('No se pudo eliminar la lectura:', error);
		}
	};
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
				<button
					className='btn btn-sm btn-destructive'
					onClick={handleOpenDeleteConfirmation}
				>
					<Trash2 className='h-4 w-4' />
					Eliminar
				</button>
			</div>
			<ModalConfirmacion
				isOpen={isDeleteConfirmationOpen}
				onClose={handleCloseDeleteConfirmation}
				onConfirm={handleDeleteReading}
				title='¿Estás seguro de querer eliminar esta lectura?'
				description='Esta acción no se puede deshacer.'
				confirmText='Eliminar'
				cancelText='Cancelar'
			/>
		</div>
	);
};

export default Reading;
