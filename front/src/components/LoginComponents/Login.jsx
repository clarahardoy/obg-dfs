import TituloLogin from "./TituloLogin";
import FormInput from "./FormInput";
import FormGroup from "./FormGroup";
import BotonLogin from "./BotonLogin";
import '../styles/login.css';

const Login = () => {
	return (
		<section className="login-section">
			<div className="login-container">
				<form id="login-form" autoComplete="off">
					<TituloLogin />
					<FormGroup />
					<FormInput />
					<BotonLogin />
				</form>
			</div>
		</section>
	);
};

export default Login;