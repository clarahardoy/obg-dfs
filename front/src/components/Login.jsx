import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Link, useNavigate } from "react-router-dom";
import { useId, useState } from "react";
import { useDispatch } from "react-redux";
import { loginValidator } from "../validators/auth.validators.js";
import { loginService } from "../services/auth.service.js";
import { loguear } from "../features/auth/auth.slice.js";
import MineTitle from "./MineTitle.jsx";
import Boton from "./Boton.jsx";

const Login = () => {
	const idEmail = useId();
	const idPassword = useId();
	const [cargando, setCargando] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm({
		resolver: joiResolver(loginValidator),
		mode: "onChange",
		defaultValues: { email: "", password: "" },
	});

	const email = watch("email");
	const password = watch("password");
	const canSubmit = Boolean(email?.trim() && password?.trim());

	const onSubmit = async (values) => {
		try {
			setCargando(true);
			const dataResponsive = await loginService(values.email, values.password);

			if (dataResponsive?.token) {
				localStorage.setItem("token", dataResponsive.token);
				dispatch(loguear());
				navigate("/dashboard");
			} else {
				console.log(errors);
			}
		} catch (err) {
			const status = err?.response?.status;
			console.log(status);
		} finally {
			setCargando(false);
		}
	};

	return (
		<div className="login-container">
			<form id="login-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
				<MineTitle />

				<div className="form-group">
					<label htmlFor={idEmail}>Email</label>
					<input
						type="email"
						id={idEmail}
						name="email"
						autoComplete="username"
						placeholder="Ingresa tu email"
						aria-invalid={!!errors.email}
						{...register("email")}
					/>
				</div>
				<div className="mensaje-error" role="alert">{errors.email?.message}</div>

				<div className="form-group">
					<label htmlFor={idPassword}>Contraseña</label>
					<input
						type="password"
						id={idPassword}
						name="password"
						required
						autoComplete="current-password"
						placeholder="Ingresa tu contraseña"
						aria-invalid={!!errors.password}
						{...register("password")}
					/>
				</div>
				<div className="mensaje-error" role="alert">{errors.password?.message}</div>

				<Boton
					type="submit"
					id="login-btn"
					disabled={!canSubmit || cargando}
				>
					{cargando ? "Ingresando..." : "Iniciar sesión"}
				</Boton>

				<div className="actions">
					<Link to="/register" className="back-btn">Crear cuenta →</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;