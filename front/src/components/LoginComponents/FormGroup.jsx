const FormGroup = () => {
  return (
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required="" autoComplete="username" placeholder="Ingresa tu email" />
      <div id="error-mail" className="mensaje-error" style={{ display: "none" }}>
        Email inválido
      </div>
    </div>

  )
}

export default FormGroup