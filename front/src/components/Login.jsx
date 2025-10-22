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
				<EmailForm />
				<PasswordForm />
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