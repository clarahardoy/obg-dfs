import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginValidator } from '../validators/auth.validators.js';
import { loginService } from '../services/auth.service.js';
import { loguear } from '../features/auth.slice.js';
import { toast } from 'react-toastify';
import MineTitle from './MineTitle.jsx';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';
import { useTranslation } from 'react-i18next';

const Login = () => {
	const idEmail = useId();
	const idPassword = useId();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { t } = useTranslation();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const isToken = localStorage.getItem('token');
		if (isToken) navigate('/dashboard');
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
				localStorage.setItem('membership', data.data.membership ?? '');
				localStorage.setItem('role', data.data.role ?? '');
				localStorage.setItem('maxReadings', String(data.data.maxReadings ?? 0));
				dispatch(
					loguear({
						token: data.data.token,
						role: data.data.role,
						membership: data.data.membership,
						maxReadings: data.data.maxReadings,
					})
				);
				navigate('/dashboard');
				toast.success((t('login.toastSuccess')))
			}
		} catch (err) {
			const msg = err?.response?.data?.message
			setError(msg || '');
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
					<label htmlFor={idEmail}>{t('common.form.emailLabel')}</label>
					<input
						type='email'
						id={idEmail}
						name='email'
						autoComplete='username'
						placeholder={t('common.form.placeholderEmail')}
						aria-invalid={!!errors.email}
						{...register('email')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.email?.message}
				</div>

				<div className='form-group'>
					<label htmlFor={idPassword}>{t('common.form.passwordLabel')}</label>
					<input
						type='password'
						id={idPassword}
						name='password'
						required
						autoComplete='current-password'
						placeholder={t('common.form.placeholderPassword')}
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
					{loading ? t('login.btnLoggingIn') : t('login.btnLogin')}
				</Boton>

				<div className='actions'>
					<Link to='/register' className='back-btn'>
						{t('common.actions.createAccount') + ' →'}
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;