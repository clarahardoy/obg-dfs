import React from 'react';
import '../../styles/book-search.css';
import { Book } from 'lucide-react';

export const BookSearchResultsBox = ({ results, onBookSelect }) => {
	const handleBookSelect = (book) => {
		onBookSelect(book);
	};
	return (
		<div className='form-group'>
			<label className='form-label'>Resultados</label>
			<div className='search-results'>
				{results.map((book) => (
					<button
						key={book.googleBooksId}
						type='button'
						className='search-result-item'
						onClick={() => handleBookSelect(book)}
					>
						{book.thumbnail ? (
							<img
								src={book.thumbnail}
								alt={book.title}
								className='book-thumbnail'
							/>
						) : (
							<Book size={24} />
						)}
						<div className='book-info'>
							<p className='book-title'>{book.title}</p>
							<p className='book-author'>
								{book.author || 'Autor desconocido'}
							</p>
							{book.pages > 0 && (
								<p className='book-pages'>{book.pages} páginas </p>
							)}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};
