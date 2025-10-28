import { useDispatch } from 'react-redux';
import { getUserShelves } from '../services/shelf.service';
import { setShelves } from '../features/shelves/shelves.slice';
import { useEffect } from 'react';
import Shelf from './Shelf';
import '../styles/shelf.css';

const MOCK_DATA = [
	{
		id: 1,
		name: 'Estanteria 1',
		readings: [
			{ id: 1, title: 'Lectura 1', author: 'Autor 1' },
			{ id: 2, title: 'Lectura 2', author: 'Autor 2' },
			{ id: 3, title: 'Lectura 3', author: 'Autor 3' },
		],
	},
	{
		id: 2,
		name: 'Estanteria 2',
		readings: [{ id: 2, title: 'Lectura 2', author: 'Autor 2' }],
	},
	{
		id: 3,
		name: 'Estanteria 3',
		readings: [{ id: 3, title: 'Lectura 3', author: 'Autor 3' }],
	},
];
const ShelfList = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserShelves = async () => {
			const userShelves = await getUserShelves();
			dispatch(setShelves(userShelves));
		};
		fetchUserShelves();
	}, [dispatch]);

	// agarrar las shelves del store
	//const shelves = useSelector((state) => state.shelves.shelves);

	return (
		<div className='shelf-list'>
			<h2 className='shelf-list-title'>Tus estanterías</h2>
			<ul className='shelf-list-items'>
				{MOCK_DATA.map((shelf) => (
					<Shelf key={shelf.id} shelf={shelf} />
				))}
			</ul>
		</div>
	);
};

export default ShelfList;
