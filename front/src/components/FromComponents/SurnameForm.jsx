const SurnameForm = () => {
    return (
        <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" id="surname" name="surname" required minLength="2" maxLength="30"
                placeholder="Ingresa tu apellido" />
            <div id="error-surname" className="mensaje-error"  style={{ display: 'none' }}>
                El Apellido debe tener entre 2 y 30 caracteres
            </div>
        </div>
    );
};

export default SurnameForm;