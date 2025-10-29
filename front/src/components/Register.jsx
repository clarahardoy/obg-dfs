import { Link, useNavigate } from "react-router-dom";
import MineTitle from "./MineTitle.jsx";
import Boton from "./Boton.jsx";
import { useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {

  const idNombre = useId();
  const idApellido = useId();
  const idEmail = useId();
  const idPassword = useId();
  const idRepeatPassword = useId();

  const campoNombre = useRef(null);
  const campoApellido = useRef(null);
  const campoEmail = useRef(null);
  const campoPassword = useRef(null);
  const campoRepeatPassword = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  return (
    <div className="register-container">
      <form id="register-form" autoComplete="off" noValidate>
        <MineTitle />
        <p className="register-subtitle" role="doc-subtitle">
          Completá los datos y creá tu cuenta en <span className="brand">BookMemory</span>.
        </p>

        <div className="form-group">
          <label htmlFor={idNombre}>Nombre</label>
          <input type="text" id={idNombre} name="name"
            required minLength={2} maxLength={30}
            placeholder="Ingresa tu nombre"
            ref={campoNombre}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idApellido}>Apellido</label>
          <input type="text" id={idApellido} name="surname"
            required minLength="2" maxLength="30"
            placeholder="Ingresa tu apellido"
            ref={campoApellido}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idEmail}>Email</label>
          <input type="email" id={idEmail} name="email" required
            autoComplete="email"
            placeholder="Ingresa tu email"
            ref={campoEmail}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idPassword}>Contraseña</label>
          <input type="password" id={idPassword} name="password" required=""
            autoComplete="current-password"
            placeholder="Crea una contraseña"
            ref={campoPassword}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idRepeatPassword}>Confirmar contraseña</label>
          <input type="password" id={idRepeatPassword} name="confirmPassword"
            required autoComplete="new-password"
            placeholder="Repite tu contraseña"
            ref={campoRepeatPassword} />
        </div>

        {error && (
          <div className="mensaje-error" role="alert">
            {error}
          </div>
        )}

        <Boton type="submit" id="register-btn" className="btn btn-muted" disabled={cargando}>
          {cargando ? "Ingresando..." : "Crear cuenta"}
        </Boton>

        <div className="actions">
          <Link to="/login" className="back-btn">← Ya tengo cuenta</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;