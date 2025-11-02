import { useDispatch } from 'react-redux';
import { getUserShelves } from '../services/shelf.service';
import { setShelves } from '../features/shelves.slice';
import { useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';
import Shelf from './Shelf';
import '../styles/shelf.css';
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';

const ShelfList = () => {
	const dispatch = useDispatch();
	const [isLoadingShelves, setIsLoadingShelves] = useState(false);

	const fetchUserShelves = useCallback(async () => {
		try {
			setIsLoadingShelves(true);
			const userShelves = await getUserShelves();
			dispatch(setShelves(userShelves));
		} catch (error) {
			console.error('Error loading shelves:', error);
			toast.error('No se pudieron cargar las estanterías');
		} finally {
			setIsLoadingShelves(false);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchUserShelves();
	}, [fetchUserShelves]);

	const { shelves } = useSelector((state) => state.shelves);

	return (
		<div className='shelf-list'>
			<h2 className='shelf-list-title'>Tus estanterías</h2>
			{isLoadingShelves ? (
				<div className='shelf-loading'>
					<LoaderCircle className='input-spinner' size={18} />
				</div>
			) : (
				<ul className='shelf-list-items'>
					{shelves.map((shelf) => (
						<Shelf key={shelf._id} shelf={shelf} />
					))}
				</ul>
			)}
		</div>
	);
};

export default ShelfList;
