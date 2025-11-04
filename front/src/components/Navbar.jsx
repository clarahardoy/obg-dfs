// Navbar.jsx
import { useDispatch } from 'react-redux';
import { desloguear } from '../features/auth.slice.js';
import { useNavigate } from 'react-router';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';
import '../styles/navbar.css';
import { toast } from 'react-toastify';

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cerrarSesionLogica = () => {
		try {
			localStorage.clear();
			dispatch(desloguear());
			navigate('/');
			toast.info("Sesión cerrada con éxito")
		} catch (err) {
			console.error('Error al cerrar sesión:', err);
		}
	};

	return (
		<header className='navbar' role='banner'>
			<div className='navbar__inner'>
				<div className='navbar__side navbar__side--right'>
					<Logo />
					<span className='navbar__brand' aria-label='BookMemory'>
						BookMemory
					</span>
				</div>

				<div className='navbar__side navbar__side--left'>
					<Boton
						id='logout-btn'
						className='navbar__logout'
						onClick={cerrarSesionLogica}
					>
						Cerrar sesión
					</Boton>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
