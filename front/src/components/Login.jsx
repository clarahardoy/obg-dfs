import { Link } from "react-router-dom";
import MineTitle from "./MineTitle.jsx";
import EmailForm from "./FromComponents/EmailForm.jsx";
import PasswordForm from "./FromComponents/PasswordForm.jsx";
import Mensaje from "./Mensaje.jsx";
import Boton from "./Boton.jsx";

const Login = () => {
	return (
		<div className="login-container">
			<form id="login-form" autoComplete="off">
				<MineTitle />

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" required="" autoComplete="email" placeholder="Ingresa tu email" />
					<div id="error-mail" className="mensaje-error" style={{ display: "none" }}>
						Email inválido
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input type="password" id="password" name="password" required=""
						autoComplete="current-password"
						placeholder="Crea una contraseña"
					/>
					<div id="error-password" className="mensaje-error" style={{ display: "none" }}>
						Credenciales inválidas
					</div>
				</div>

				<Mensaje />
				<Boton type="submit" id="login-btn">
					Iniciar sesión
				</Boton>
				<div className="actions">
					<Link to="/register" className="back-btn">Crear cuenta →</Link>
				</div>
			</form>
		</div >
	);
};

export default Login;