import { Link } from "react-router-dom";
import MineTitle from "./MineTitle.jsx"
import NameForm from "./FromComponents/NameForm.jsx";
import SurnameForm from "./FromComponents/SurnameForm.jsx";
import EmailForm from "./FromComponents/EmailForm.jsx";
import PasswordForm from "./FromComponents/PasswordForm.jsx";
import Mensaje from "./Mensaje.jsx";
import Boton from "./Boton.jsx";

const Register = () => {
  return (
    <div className="register-container">
      <form id="register-form" autoComplete="off" noValidate>
        <MineTitle />
        <NameForm />
        <SurnameForm />
        <EmailForm />
        <PasswordForm />
        <Mensaje />
        <Boton type="submit" id="register-btn" className="btn btn-muted" disabled>
          Crear cuenta
        </Boton>
        <div className="actions">
          <Link to="/login" className="back-btn">← Ya tengo cuenta</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;