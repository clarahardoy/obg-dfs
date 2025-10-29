import { Link, useNavigate } from "react-router-dom";
import { useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginService } from "../services/auth.service.js";
import { loguear } from "../features/auth/auth.slice.js";
import MineTitle from "./MineTitle.jsx";
import Boton from "./Boton.jsx";

const Login = () => {

	const idEmail = useId();
	const idPassword = useId();

	const campoEmail = useRef(null);
	const campoPassword = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState("");
	const [cargando, setCargando] = useState(false);

	const validarLogin = async (e) => {
		e.preventDefault();
		const email = campoEmail.current.value.trim();
		const password = campoPassword.current.value;

		if ((!email) || (!password)) {
			setError("Todos los campos son obligatorios");
			return;
		}
		try {
			setCargando(true);
			setError("");

			const data = await loginService(email, password);
			if (data.token) {
				localStorage.setItem("token", data.token);
				dispatch(loguear());
				navigate("/dashboard");
			} else {
				setError("Credenciales incorrectas");
			}
		} catch (err) {
			setError(err.message);
			setError("Credenciales incorrectas");
		} finally {
			setCargando(false);
		}
	};

	return (
		<div className="login-container">
			<form id="login-form" autoComplete="off" onSubmit={validarLogin}>
				<MineTitle />

				<div className="form-group">
					<label htmlFor={idEmail}>Email</label>
					<input type="email" id={idEmail} required
						autoComplete="email"
						placeholder="Ingresa tu email"
						ref={campoEmail}
					/>
				</div>

				<div className="form-group">
					<label htmlFor={idPassword}>Contraseña</label>
					<input type="password" id={idPassword} required
						autoComplete="current-password"
						placeholder="Ingresa tu contraseña"
						ref={campoPassword}
					/>
				</div>

				{error && (
					<div className="mensaje-error" role="alert">
						{error}
					</div>
				)}

				<Boton type="submit" id="login-btn" disabled={cargando}>
					{cargando ? "Ingresando..." : "Iniciar sesión"}
				</Boton>

				<div className="actions">
					<Link to="/register" className="back-btn">Crear cuenta →</Link>
				</div>
			</form>
		</div >
	);
};

export default Login;