const ConfirmPasswordForm = () => {
    return (
        <div className="form-group">
            <label for="confirmPassword">Confirmar contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required autocomplete="new-password"
                placeholder="Repite tu contraseña" />
            <div id="error-confirm" className="mensaje-error"  style={{ display: 'none' }}>
                Las contraseñas no coinciden
            </div>
        </div>
    );
};

export default ConfirmPasswordForm;