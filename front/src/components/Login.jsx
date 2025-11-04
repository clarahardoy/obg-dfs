import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginValidator } from '../validators/auth.validators.js';
import { loginService } from '../services/auth.service.js';
import { desloguear, loguear } from '../features/auth.slice.js';
import { toast } from 'react-toastify';
import MineTitle from './MineTitle.jsx';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';

const Login = () => {
	const idEmail = useId();
	const idPassword = useId();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const isToken = localStorage.getItem('token');

		if (isToken) {
			navigate('/dashboard');
		}
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(loginValidator),
		mode: 'onChange',
		defaultValues: { email: '', password: '' },
	});

	const email = watch('email');
	const password = watch('password');
	const canSubmit = Boolean(email?.trim() && password?.trim());

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			setError("");
			const data = await loginService(values.email, values.password);

			if (data?.data.token) {
				localStorage.setItem('token', data.data.token);
				dispatch(
					loguear({
						token: data.data.token,
						role: data.data.role,
						membership: data.data.membership,
						maxReadings: data.data.maxReadings,
					})
				);
				navigate('/dashboard');
				toast.success("Sesión iniciada con éxito.")
			} else {
				console.log(errors);
			}
		} catch (err) {
			const msg = err?.response?.data?.error
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='login-container'>
			<form
				id='login-form'
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<Logo className='logo-form' />

				<MineTitle />

				<div className='form-group'>
					<label htmlFor={idEmail}>Email</label>
					<input
						type='email'
						id={idEmail}
						name='email'
						autoComplete='username'
						placeholder='Ingresa tu email'
						aria-invalid={!!errors.email}
						{...register('email')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.email?.message}
				</div>

				<div className='form-group'>
					<label htmlFor={idPassword}>Contraseña</label>
					<input
						type='password'
						id={idPassword}
						name='password'
						required
						autoComplete='current-password'
						placeholder='Ingresa tu contraseña'
						aria-invalid={!!errors.password}
						{...register('password')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.password?.message}
				</div>
				<div className='mensaje-error' role='alert'>
					<p>{error}</p>
				</div>
				<Boton type='submit' id='login-btn' disabled={!canSubmit || loading}>
					{loading ? 'Ingresando...' : 'Iniciar sesión'}
				</Boton>

				<div className='actions'>
					<Link to='/register' className='back-btn'>
						Crear cuenta →
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
