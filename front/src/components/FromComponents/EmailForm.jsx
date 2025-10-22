const EmailForm = () => {
  return (
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required="" autoComplete="email" placeholder="Ingresa tu email" />
      <div id="error-mail" className="mensaje-error" style={{ display: "none" }}>
        Email inválido
      </div>
    </div>
  );
};

export default EmailForm;