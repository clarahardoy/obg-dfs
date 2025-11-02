import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerService } from '../services/auth.service.js';
import { loguear } from '../features/auth.slice.js';
import { registerValidator } from '../validators/auth.validators.js';
import MineTitle from './MineTitle.jsx';
import Boton from './Boton.jsx';
import Logo from './Logo.jsx';

const Register = () => {
	const idNombre = useId();
	const idApellido = useId();
	const idEmail = useId();
	const idPassword = useId();
	const idRepeatPassword = useId();

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

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
				if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
				dispatch(
					loguear({
						token: data.data.token,
						role: data.data.role,
						membership: data.data.membership,
						maxReadings: data.data.maxReadings,
					})
				);
				navigate('/dashboard');
			} else {
				setValue('password', '');
				setValue('repeatPassword', '');
			}
		} catch (err) {
			setValue('password', '');
			setValue('repeatPassword', '');
			console.error('No se pudo crear la cuenta:', err);
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
					Completá los datos y creá tu cuenta en{' '}
					<span className='brand'>BookMemory</span>.
				</p>

				<div className='form-group'>
					<label htmlFor={idNombre}>Nombre</label>
					<input
						type='text'
						id={idNombre}
						placeholder='Ingresa tu nombre'
						autoComplete='given-name'
						aria-invalid={!!errors.name}
						{...register('name')}
					/>
					<div className='mensaje-error' role='alert'>
						{errors.name?.message}
					</div>
				</div>

				<div className='form-group'>
					<label htmlFor={idApellido}>Apellido</label>
					<input
						type='text'
						id={idApellido}
						placeholder='Ingresa tu apellido'
						autoComplete='family-name'
						aria-invalid={!!errors.surname}
						{...register('surname')}
					/>
					<div className='mensaje-error' role='alert'>
						{errors.surname?.message}
					</div>
				</div>

				<div className='form-group'>
					<label htmlFor={idEmail}>Email</label>
					<input
						type='email'
						id={idEmail}
						placeholder='Ingresa tu email'
						autoComplete='email'
						aria-invalid={!!errors.email}
						{...register('email')}
					/>
					<div className='mensaje-error' role='alert'>
						{errors.email?.message}
					</div>
				</div>

				<div className='form-group'>
					<label htmlFor={idPassword}>Contraseña</label>
					<input
						type='password'
						id={idPassword}
						placeholder='Crea una contraseña'
						autoComplete='new-password'
						aria-invalid={!!errors.password}
						{...register('password')}
					/>
					<div className='mensaje-error' role='alert'>
						{errors.password?.message}
					</div>
				</div>

				<div className='form-group'>
					<label htmlFor={idRepeatPassword}>Confirmar contraseña</label>
					<input
						type='password'
						id={idRepeatPassword}
						placeholder='Repite tu contraseña'
						autoComplete='new-password'
						aria-invalid={!!errors.repeatPassword}
						{...register('repeatPassword')}
					/>
					<div className='mensaje-error' role='alert'>
						{errors.repeatPassword?.message}
					</div>
				</div>

				<Boton
					type='submit'
					id='register-btn'
					className='btn btn-muted'
					disabled={!canSubmit}
				>
					{loading ? 'Creando cuenta...' : 'Crear cuenta'}
				</Boton>

				<div className='actions'>
					<Link to='/login' className='back-btn'>
						← Ya tengo cuenta
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;
