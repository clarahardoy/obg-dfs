import React from 'react';
import '../../styles/book-search.css';
import { Book } from 'lucide-react';

export const SelectedBook = ({ book, onBookChange }) => {
	return (
		<div className='selected-book-card'>
			<div className='selected-book-header'>
				{book.thumbnail ? (
					<img
						src={book.thumbnail}
						alt={book.title}
						className='selected-book-thumbnail'
					/>
				) : (
					<Book size={24} />
				)}
				<div className='selected-book-info'>
					<h3 className='selected-book-title'>{book.title}</h3>
					<p className='selected-book-author'>
						{book.author || 'Autor desconocido'}
					</p>
					{book.pages > 0 && (
						<p className='selected-book-pages'>{book.pages} páginas</p>
					)}
				</div>
				<button type='button' className='btn-cancel' onClick={onBookChange}>
					Cambiar
				</button>
			</div>
		</div>
	);
};
