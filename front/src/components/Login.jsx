import { Link, useNavigate } from "react-router-dom";
import { useId, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { loginService } from "../services/auth.service.js";
import { loguear } from "../features/auth/auth.slice.js";
import MineTitle from "./MineTitle.jsx";
import Boton from "./Boton.jsx";

const INITIAL_FORM = { email: "", password: "" };

function validate(form) {
	const { email = "", password = "" } = form || {};
	if (!email.trim() || !password) {
		return { valid: false, reason: "Todos los campos son obligatorios" };
	}
	return { valid: true, reason: "" };
}

const Login = () => {
	const idEmail = useId();
	const idPassword = useId();

	const [form, setForm] = useState(INITIAL_FORM);
	const [error, setError] = useState("");
	const [cargando, setCargando] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const v = useMemo(() => validate(form), [form]);
	const canSubmit = v.valid && !cargando;

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
		if (error) setError("");
	};

	const validarLogin = async (e) => {
		e.preventDefault();

		const check = validate(form);
		if (!check.valid) {
			setError(check.reason);
			return;
		}

		try {
			setCargando(true);
			setError("");

			const data = await loginService(form.email.trim(), form.password);

			if (data?.token) {
				localStorage.setItem("token", data.token);
				if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
				dispatch(loguear());
				navigate("/dashboard");
			} else {
				setError("Credenciales incorrectas");
				setForm(INITIAL_FORM);
			}
		} catch (err) {
			const status = err?.response?.status;
			setError(status >= 500 ? "No se pudo iniciar sesión. Intenta más tarde." : "Credenciales incorrectas");
			setForm(INITIAL_FORM);
		} finally {
			setCargando(false);
		}
	};

	return (
		<div className="login-container">
			<form id="login-form" autoComplete="off" onSubmit={validarLogin} noValidate>
				<MineTitle />

				<div className="form-group">
					<label htmlFor={idEmail}>Email</label>
					<input
						type="email"
						id={idEmail}
						name="email"
						required
						autoComplete="username"
						placeholder="Ingresa tu email"
						value={form.email}
						onChange={onChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor={idPassword}>Contraseña</label>
					<input
						type="password"
						id={idPassword}
						name="password"
						required
						autoComplete="current-password"
						placeholder="Ingresa tu contraseña"
						value={form.password}
						onChange={onChange}
					/>
				</div>

				{error && <div className="mensaje-error" role="alert">{error}</div>}

				<Boton type="submit" id="login-btn" disabled={!canSubmit}>
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