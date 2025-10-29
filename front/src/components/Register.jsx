import { useId, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerService } from "../services/auth.service.js";
import { loguear } from "../features/auth/auth.slice.js";
import MineTitle from "./MineTitle.jsx";
import Boton from "./Boton.jsx";

function validate(form) {
  const { name, surname, email, password, repeatPassword } = form;

  if (!name.trim() || !surname.trim() || !email.trim() || !password || !repeatPassword) {
    return { valid: false, reason: "Todos los campos son obligatorios" };
  }
  if (password !== repeatPassword) {
    return { valid: false, reason: "Las contraseñas no coinciden" };
  }
  // Podés sumar más reglas aquí (longitud mínima, regex de email, etc.)
  return { valid: true, reason: "" };
}

const Register = () => {

  const idNombre = useId();
  const idApellido = useId();
  const idEmail = useId();
  const idPassword = useId();
  const idRepeatPassword = useId();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
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

  const onSubmit = async (e) => {
    e.preventDefault();

    const check = validate(form);
    if (!check.valid) {
      setError(check.reason);
      return;
    }

    const nuevoUsuario = {
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.repeatPassword,
      name: form.name.trim(),
      surname: form.surname.trim(),
      role: "user",
    };

    try {
      setCargando(true);
      setError("");

      const data = await registerService(nuevoUsuario);
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(loguear());
        navigate("/dashboard");
      } else {
        setError(data.error ?? "No se recibi+o token");
      }
    } catch (error) {
      setError(error.response?.data?.message ?? "Ocurrió un error inesperado, intentá más tarde");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-container">
      <form id="register-form" autoComplete="off" noValidate onSubmit={onSubmit}>
        <MineTitle />
        <p className="register-subtitle" role="doc-subtitle">
          Completá los datos y creá tu cuenta en <span className="brand">BookMemory</span>.
        </p>

        <div className="form-group">
          <label htmlFor={idNombre}>Nombre</label>
          <input
            type="text"
            id={idNombre}
            name="name"
            required
            minLength={2}
            maxLength={30}
            placeholder="Ingresa tu nombre"
            value={form.name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idApellido}>Apellido</label>
          <input
            type="text"
            id={idApellido}
            name="surname"
            required
            minLength={2}
            maxLength={30}
            placeholder="Ingresa tu apellido"
            value={form.surname}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idEmail}>Email</label>
          <input
            type="email"
            id={idEmail}
            name="email"
            required
            autoComplete="email"
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
            autoComplete="new-password"
            placeholder="Crea una contraseña"
            value={form.password}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor={idRepeatPassword}>Confirmar contraseña</label>
          <input
            type="password"
            id={idRepeatPassword}
            name="repeatPassword"
            required
            autoComplete="new-password"
            placeholder="Repite tu contraseña"
            value={form.repeatPassword}
            onChange={onChange}
          />
          {form.password && form.repeatPassword && form.password !== form.repeatPassword && (
            <div className="mensaje-error" role="alert">Las contraseñas no coinciden</div>
          )}
        </div>

        {error && (
          <div className="mensaje-error" role="alert">
            {error}
          </div>
        )}

        <Boton type="submit" id="register-btn" className="btn btn-muted" disabled={!canSubmit}>
          {cargando ? "Creando cuenta..." : "Crear cuenta"}
        </Boton>

        <div className="actions">
          <Link to="/login" className="back-btn">← Ya tengo cuenta</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;