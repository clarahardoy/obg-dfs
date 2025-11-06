import { useState, useEffect } from 'react';
import { searchBooks } from '../../services/book.service';
import { BookSearchResultsBox } from './BookSearchResultsBox';
import '../../styles/book-search.css';
import '../../styles/modal.css';
import { LoaderCircle } from 'lucide-react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BookSearch = ({ onBookSelect, selectedBook }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		if (!searchQuery.trim()) {
			setSearchResults([]);
			return;
		}

		const timer = setTimeout(async () => {
			setIsSearching(true);
			try {
				const data = await searchBooks(searchQuery);
				setSearchResults(data.books || []);
			} catch (error) {
				console.error('Error searching books:', error);
				setSearchResults([]);
			} finally {
				setIsSearching(false);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	return (
		<>
			{!selectedBook && (
				<div className='search-book-group'>
					<div className='input-wrapper'>
						<Search size={18} className='input-icon' />
						<input
							id='search'
							type='text'
							className='form-input form-input-search'
							placeholder={t('bookSearch.placeholderSearch')}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{isSearching && (
							<LoaderCircle className='input-spinner' size={18} />
						)}
					</div>
				</div>
			)}
			{searchResults.length > 0 && !selectedBook && (
				<BookSearchResultsBox
					results={searchResults}
					onBookSelect={onBookSelect}
				/>
			)}
		</>
	);
};