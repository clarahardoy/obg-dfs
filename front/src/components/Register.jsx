import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerService } from '../services/auth.service.js';
import { loguear } from '../features/auth.slice.js';
import { registerValidator } from '../validators/auth.validators.js';
import { toast } from 'react-toastify';
import { Trans, useTranslation } from 'react-i18next';
import { LoaderCircle } from 'lucide-react';
import MineTitle from './MineTitle.jsx';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const Register = () => {
	// vamos a hacer redeply
	const idNombre = useId();
	const idApellido = useId();
	const idEmail = useId();
	const idPassword = useId();
	const idRepeatPassword = useId();
	const idImage = useId();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

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
	const imageFiles = watch('image');

	const hasImage = Boolean(imageFiles && imageFiles.length > 0);

	const canSubmit =
		Boolean(
			name?.trim() &&
			surname?.trim() &&
			email?.trim() &&
			password?.trim() &&
			repeatPassword?.trim() &&
			password === repeatPassword &&
			hasImage
		) && !loading;

	const uploadToCloudinary = async (file) => {
		if (!file) throw new Error('Seleccioná una imagen');

		if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_PRESET) {
			throw new Error('Faltan variables de entorno de Cloudinary (cloud name o preset).');
		}
		const fd = new FormData();
		fd.append('file', file);
		fd.append('upload_preset', CLOUDINARY_PRESET);
		fd.append('cloud_name', CLOUDINARY_CLOUD_NAME);

		const res = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
			{ method: 'POST', body: fd }
		);

		let body;
		try { body = await res.json(); } catch { body = {}; }
		if (!res.ok) {
			const reason = body?.error?.message || `Falló Cloudinary (${res.status})`;
			throw new Error(reason);
		}
		return body;
	};

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			setError('');

			const file = values.image?.[0];
			const uploaded = await uploadToCloudinary(file);
			const avatarUrl = uploaded.secure_url;
			const avatarPublicId = uploaded.public_id ?? null;

			const nuevoUsuario = {
				name: values.name.trim(),
				surname: values.surname.trim(),
				email: values.email.trim(),
				password: values.password,
				confirmPassword: values.repeatPassword,
				role: 'user',
				avatarUrl,
				avatarPublicId,
			};

			const data = await registerService(nuevoUsuario);

			const token = data?.data?.token;
			if (token) {
				localStorage.setItem('token', token);
				localStorage.setItem('role', data.data.role ?? '');
				localStorage.setItem('membership', data.data.membership ?? '');
				localStorage.setItem('maxReadings', String(data.data.maxReadings ?? 0));

				const avatarFromApi = data?.data?.avatarUrl || avatarUrl;
				if (avatarFromApi) {
					localStorage.setItem('avatarUrl', avatarFromApi);
				}

				dispatch(
					loguear({
						token: data.data.token,
						role: data.data.role,
						membership: data.data.membership,
						maxReadings: data.data.maxReadings,
						avatarUrl: avatarFromApi,
					})
				);

				navigate('/dashboard');
				toast.success(t('register.toastSuccess'));
			} else {
				setValue('password', '');
				setValue('repeatPassword', '');
			}
		} catch (err) {
			const msg = err?.response?.data?.error || err?.error;
			setValue('password', '');
			setValue('repeatPassword', '');
			setError(msg || '');
			toast.error('No se pudo completar el registro');
			console.error(err);
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
						i18nKey='register.subtitle'
						components={{ brand: <span className='brand' /> }}
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
				<div className='mensaje-error' role='alert'>{errors.name?.message}</div>

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
				<div className='mensaje-error' role='alert'>{errors.surname?.message}</div>

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
				<div className='mensaje-error' role='alert'>{errors.email?.message}</div>

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
				<div className='mensaje-error' role='alert'>{errors.password?.message}</div>

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
				<div className='mensaje-error' role='alert'>{errors.repeatPassword?.message}</div>

				{/* Imagen */}
				<div className='form-group'>
					<label htmlFor={idImage}>Foto de perfil (JPG, PNG o WEBP, máx 2MB)</label>
					<input
						id={idImage}
						type='file'
						accept='image/png,image/jpeg,image/webp'
						aria-invalid={!!errors.image}
						{...register('image')}
					/>
				</div>
				<div className='mensaje-error' role='alert'>{errors.image?.message}</div>

				<div className='mensaje-error' role='alert'>
					<p>{error}</p>
				</div>

				<Boton
					type='submit'
					id='register-btn'
					className='btn btn-muted'
					disabled={!canSubmit || loading}
				>
					{loading ? (
						<LoaderCircle className='btn-spinner' size={18} />
					) : (
						t('common.actions.createAccount')
					)}
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