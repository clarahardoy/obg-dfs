import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerService } from '../services/auth.service.js';
import { loguear } from '../features/auth.slice.js';
import { registerValidator } from '../validators/auth.validators.js';
import { toast } from 'react-toastify';
import MineTitle from './MineTitle.jsx';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';
import { Trans, useTranslation } from 'react-i18next';

const Register = () => {
	const idNombre = useId();
	const idApellido = useId();
	const idEmail = useId();
	const idPassword = useId();
	const idRepeatPassword = useId();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: joiResolver(registerValidator),
		mode: 'onChange',
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
	});

	const name = watch('name');
	const surname = watch('surname');
	const email = watch('email');
	const password = watch('password');
	const repeatPassword = watch('repeatPassword');

	const canSubmit =
		Boolean(
			name?.trim() &&
			surname?.trim() &&
			email?.trim() &&
			password?.trim() &&
			repeatPassword?.trim() &&
			password === repeatPassword
		) && !loading;

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			setError("");

			const nuevoUsuario = {
				name: values.name.trim(),
				surname: values.surname.trim(),
				email: values.email.trim(),
				password: values.password,
				confirmPassword: values.repeatPassword,
				role: 'user',
			};

			const data = await registerService(nuevoUsuario);

			if (data?.data.token) {
				localStorage.setItem('token', data.data.token);
				localStorage.setItem('role', data.data.role ?? '');
				localStorage.setItem('membership', data.data.membership ?? '');
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
				toast.success((t('register.toastSuccess')));
			} else {
				setValue('password', '');
				setValue('repeatPassword', '');
			}
		} catch (err) {
			const msg = err?.response?.data?.message
			setValue('password', '');
			setValue('repeatPassword', '');
			setError(msg || '');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='register-container'>
			<form
				id='register-form'
				autoComplete='off'
				noValidate
				onSubmit={handleSubmit(onSubmit)}
			>
				<Logo className='logo-form' />

				<MineTitle />

				<p className='register-subtitle' role='doc-subtitle'>
					<Trans
						i18nKey="register.subtitle"
						components={{ brand: <span className="brand" /> }}
						values={{ brand: 'BookMemory' }}
					/>
				</p>

				<div className='form-group'>
					<label htmlFor={idNombre}>{t('register.nameLabel')}</label>
					<input
						type='text'
						id={idNombre}
						placeholder={t('register.placeholderName')}
						autoComplete='given-name'
						aria-invalid={!!errors.name}
						{...register('name')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.name?.message}
				</div>

				<div className='form-group'>
					<label htmlFor={idApellido}>{t('register.surnameLabel')}</label>
					<input
						type='text'
						id={idApellido}
						placeholder={t('register.placeholderSurname')}
						autoComplete='family-name'
						aria-invalid={!!errors.surname}
						{...register('surname')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.surname?.message}
				</div>

				<div className='form-group'>
					<label htmlFor={idEmail}>{t('common.form.emailLabel')}</label>
					<input
						type='email'
						id={idEmail}
						placeholder={t('common.form.placeholderEmail')}
						autoComplete='email'
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
						placeholder={t('common.form.placeholderPassword')}
						autoComplete='new-password'
						aria-invalid={!!errors.password}
						{...register('password')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.password?.message}
				</div>

				<div className='form-group'>
					<label htmlFor={idRepeatPassword}>{t('register.repeatPasswordLabel')}</label>
					<input
						type='password'
						id={idRepeatPassword}
						placeholder={t('register.placeholderPasswordRepeat')}
						autoComplete='new-password'
						aria-invalid={!!errors.repeatPassword}
						{...register('repeatPassword')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>
					{errors.repeatPassword?.message}
				</div>
				<div className='mensaje-error' role='alert'>
					<p>{error}</p>
				</div>
				<Boton
					type='submit'
					id='register-btn'
					className='btn btn-muted'
					disabled={!canSubmit}
				>
					{loading ? t('register.btnCreatingAccount') : t('common.actions.createAccount')}
				</Boton>

				<div className='actions'>
					<Link to='/login' className='back-btn'>
						{'← ' + t('register.linkHaveAccount')}
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;