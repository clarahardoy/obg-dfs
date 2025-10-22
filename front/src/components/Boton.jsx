// Boton.jsx
const Boton = ({
	type = "button",
	id,
	className = "",
	disabled = false,
	onClick,
	children,
}) => {
	return (
		<button type={type} id={id} className={className}
			disabled={disabled} onClick={onClick} >
			{children}
		</button>
	);
};

export default Boton;