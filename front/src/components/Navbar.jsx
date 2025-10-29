// Navbar.jsx
import { useDispatch } from "react-redux";
import { desloguear } from "../features/auth/auth.slice.js";
import { useNavigate } from "react-router";
import Boton from "./Boton.jsx";
import "../styles/navbar.css";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cerrarSesionLogica = () => {
        try {
            localStorage.clear();
            dispatch(desloguear());
            navigate("/");
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        }
    };

    return (
        <header className="navbar" role="banner">
            <div className="navbar__inner">
                <div className="navbar__side navbar__side--right">
                    <span className="navbar__brand" aria-label="BookMemory">BookMemory</span>
                </div>

                <div className="navbar__side navbar__side--left">
                    <Boton id="logout-btn" className="navbar__logout" onClick={cerrarSesionLogica}>
                        Cerrar sesión
                    </Boton>
                </div>
            </div>
        </header>
    );
};

export default Navbar;