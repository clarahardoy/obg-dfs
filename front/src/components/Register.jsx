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
        <p className="register-subtitle" role="doc-subtitle">
          Completá los datos y creá tu cuenta en <span className="brand">BookMemory</span>.
        </p>

        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required minLength={2} maxLength={30} placeholder="Ingresa tu nombre" />
          <div id="error-name" className="mensaje-error" style={{ display: 'none' }}>
            El Nombre debe tener entre 2 y 30 caracteres
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="surname">Apellido</label>
          <input type="text" id="surname" name="surname" required minLength="2" maxLength="30"
            placeholder="Ingresa tu apellido" />
          <div id="error-surname" className="mensaje-error" style={{ display: 'none' }}>
            El Apellido debe tener entre 2 y 30 caracteres
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required="" autoComplete="email" placeholder="Ingresa tu email" />
          <div id="error-mail" className="mensaje-error" style={{ display: "none" }}>
            Email inválido
          </div>
        </div>

        <div className="form-input">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required=""
            autoComplete="current-password"
            placeholder="Crea una contraseña"
          />
          <div id="error-password" className="mensaje-error" style={{ display: "none" }}>
            Credenciales inválidas
          </div>
        </div>

        <div className="form-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required autocomplete="new-password"
            placeholder="Repite tu contraseña" />
          <div id="error-confirm" className="mensaje-error" style={{ display: 'none' }}>
            Las contraseñas no coinciden
          </div>
        </div>

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