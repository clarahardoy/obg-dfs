import { useDispatch } from 'react-redux';
import { desloguear } from '../features/auth.slice.js';
import { useNavigate } from 'react-router';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';
import '../styles/navbar.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();

	const onSubmit = () => {
		try {
			localStorage.clear();
			dispatch(desloguear());
			navigate('/');
			toast.success((t('login.toastLoggedOut')));
		} catch (err) {
			console.log(err?.response?.data?.message);
		}
	};

	const changeLanguage = e => {
		const language = e.target.value;
		i18n.changeLanguage(language);
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

				<div>
					<select value={i18n.language} onChange={changeLanguage}>
						<option value="es">ES</option>
						<option value="en">EN</option>
					</select>
				</div>
				<div className='navbar__side navbar__side--left'>
					<Boton
						id='logout-btn'
						className='navbar__logout'
						onClick={onSubmit}
					>
						{t('common.actions.logout')}
					</Boton>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
