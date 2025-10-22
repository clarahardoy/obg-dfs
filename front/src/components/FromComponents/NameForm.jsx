const NameForm = () => {
    return (
        <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required minLength={2} maxLength={30} placeholder="Ingresa tu nombre" />
            <div id="error-name" className="mensaje-error" style={{ display: 'none' }}>
                El Nombre debe tener entre 2 y 30 caracteres
            </div>
        </div>
    );
};

export default NameForm;