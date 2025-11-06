import { useState } from 'react';
import { BookSearch } from './BookSearch';
import { SelectedBook } from './SelectedBook';
import { ReadingForm } from './ReadingForm';
import '../../styles/modal.css';
import '../../styles/reading.css';
import { ReadingStatus } from '../../utils/reading-status';
import { useTranslation } from 'react-i18next';

export const AddReading = ({ open, onClose, shelfId, onAdd }) => {
	const [selectedBook, setSelectedBook] = useState(null);
	const [status, setStatus] = useState(ReadingStatus.WANT_TO_READ);
	const [startedReading, setStartedReading] = useState('');
	const [finishedReading, setFinishedReading] = useState('');
	const [currentPage, setCurrentPage] = useState('0');
	const { t } = useTranslation();

	const handleBookSelect = (book) => {
		setSelectedBook(book);
	};

	const handleBookChange = () => {
		setSelectedBook(null);
	};

	const handleSubmit = () => {
		if (!selectedBook) return;

		onAdd({
			shelfId,
			googleBooksId: selectedBook.googleBooksId,
			status,
			startedReading: startedReading ? new Date(startedReading) : undefined,
			finishedReading: finishedReading ? new Date(finishedReading) : undefined,
			pageCount: selectedBook.pages || 0,
			currentPage: parseInt(currentPage) || 0,
		});

		resetForm();
		onClose();
	};

	const resetForm = () => {
		setSelectedBook(null);
		setStatus(ReadingStatus.WANT_TO_READ);
		setStartedReading('');
		setFinishedReading('');
		setCurrentPage('0');
	};

	if (!open) return null;

	return (
		<>
			<div className='modal-background' onClick={onClose} />
			<div className='modal-container modal-container-large'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h3 className='modal-title'>{t('addReading.title')}</h3>
						<p className='modal-description'>{t('addReading.description')}</p>
					</div>

					<form onSubmit={handleSubmit} className='modal-form'>
						<BookSearch
							onBookSelect={handleBookSelect}
							selectedBook={selectedBook}
						/>

						{selectedBook && (
							<>
								<SelectedBook
									book={selectedBook}
									onBookChange={handleBookChange}
								/>
								<ReadingForm
									status={status}
									setStatus={setStatus}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									startedReading={startedReading}
									setStartedReading={setStartedReading}
									finishedReading={finishedReading}
									setFinishedReading={setFinishedReading}
									maxPages={selectedBook.pages}
								/>
							</>
						)}

						<div className='modal-actions'>
							<button type='button' className='btn-cancel' onClick={onClose}>
								{t('common.actions.cancel')}
							</button>
							<button
								type='button'
								className='btn-confirm'
								disabled={!selectedBook}
								onClick={handleSubmit}
							>
								{t('shelf.btnAddReading')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};