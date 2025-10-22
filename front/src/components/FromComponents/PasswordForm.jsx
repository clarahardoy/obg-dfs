const PasswordForm = () => {
    return (
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
    );
};

export default PasswordForm;