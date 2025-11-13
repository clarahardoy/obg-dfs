import '../../styles/book-search.css';
import { Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BookSearchResultsBox = ({ results, onBookSelect }) => {
	const { t } = useTranslation();

	const handleBookSelect = (book) => {
		onBookSelect(book);
	};

	const toSecureUrl = (url) =>
		typeof url === 'string' ? url.replace(/^http:\/\//i, 'https://') : url;

	return (
		<div className='form-group'>
			<label className='form-label'>{t('bookSearch.resultsLabel')}</label>
			<div className='search-results'>
				{results.map((book) => {
					const thumb = toSecureUrl(book.thumbnail);

					return (
						<button
							key={book.googleBooksId}
							type='button'
							className='search-result-item'
							onClick={() => handleBookSelect(book)}
						>
							{thumb ? (
								<img
									src={thumb}
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
									<p className='book-pages'>
										{book.pages}{' '}
										{t('common.units.pages', { count: book.pages })}
									</p>
								)}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};