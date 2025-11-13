import { useDispatch, useSelector } from 'react-redux';
import { getUserShelves, createShelf } from '../services/shelf.service';
import { setShelves, addShelfToList } from '../features/shelves.slice';
import { useEffect, useCallback, useState } from 'react';
import Shelf from './Shelf';
import '../styles/shelf.css';
import { toast } from 'react-toastify';
import { LoaderCircle, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MembershipTypes } from '../utils/membership-types';
import { ShelfForm } from './ShelfForm';

const ShelfList = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [isLoadingShelves, setIsLoadingShelves] = useState(false);
	const [isAddShelfOpen, setIsAddShelfOpen] = useState(false);

	const fetchUserShelves = useCallback(async () => {
		try {
			setIsLoadingShelves(true);
			const userShelves = await getUserShelves();
			dispatch(setShelves(userShelves));
		} catch (error) {
			console.error('Error loading shelves:', error);
			toast.error(t('shelves.toastLoadError'));
		} finally {
			setIsLoadingShelves(false);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchUserShelves();
	}, [fetchUserShelves]);

	const { shelves } = useSelector((state) => state.shelves);
	const membership = useSelector((state) => state.auth.membership);
	const isPremium = membership === MembershipTypes.PREMIUM;

	const handleCreateShelf = async ({ name }) => {
		try {
			const newShelf = await createShelf(name);
			dispatch(addShelfToList(newShelf));
			toast.success(t('shelves.toastAddSuccess'));
		} catch (error) {
			console.error('No se pudo crear la estantería:', error);
			toast.error(t('shelves.toastAddError'));
			throw error;
		}
	};

	return (
		<div className='shelf-list'>
			<div className='shelf-list-header'>
				<h2 className='shelf-list-title'>{t('shelves.title')}</h2>

				{isPremium && (
					<button
						type='button'
						className='btn btn-ghost btn-sm'
						onClick={() => setIsAddShelfOpen(true)}
					>
						<Plus className='h-4 w-4' />
						{t('shelves.btnAddShelf')}
					</button>
				)}
			</div>

			{isLoadingShelves ? (
				<div className='shelf-loading'>
					<LoaderCircle className='input-spinner' size={40} />
				</div>
			) : (
				<ul className='shelf-list-items'>
					{shelves.map((shelf) => (
						<Shelf key={shelf._id} shelf={shelf} />
					))}
				</ul>
			)}

			{isPremium && (
				<ShelfForm
					open={isAddShelfOpen}
					onClose={() => setIsAddShelfOpen(false)}
					onSubmit={handleCreateShelf}
				/>
			)}
		</div>
	);
};
export default ShelfList;
