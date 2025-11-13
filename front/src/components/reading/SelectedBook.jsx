import '../../styles/book-search.css';
import { Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SelectedBook = ({ book, onBookChange }) => {
	const { t } = useTranslation();
	const toSecureUrl = (url) =>
		typeof url === 'string' ? url.replace(/^http:\/\//i, 'https://') : url;
	const thumb = toSecureUrl(book.thumbnail);
	return (
		<div className='selected-book-card'>
			<div className='selected-book-header'>
				{thumb ? (
					<img
						src={thumb}
						alt={book.title}
						className='selected-book-thumbnail'
					/>
				) : (
					<Book size={32} />
				)}
				<div className='selected-book-info'>
					<h3 className='selected-book-title'>{book.title}</h3>
					<p className='selected-book-author'>
						{book.author || t('common.labels.unknownAuthor')}
					</p>
					{book.pages > 0 && (
						<p className='selected-book-pages'>
							{book.pages} {t('common.units.pages', { count: book.pages })}
						</p>
					)}
				</div>
				<button type='button' className='btn-cancel' onClick={onBookChange}>
					{t('common.actions.change')}
				</button>
			</div>
		</div>
	);
};