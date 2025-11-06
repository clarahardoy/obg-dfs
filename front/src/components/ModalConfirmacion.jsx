import '../styles/modal.css';

const ModalConfirmacion = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	confirmText = 'Confirmar',
	cancelText = 'Cancelar',
	children,
	className,
	isDisabled = false,
}) => {
	if (!isOpen) return null;

	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	return (
		<>
			<div className='modal-background' onClick={onClose} />
			<div className={`modal-container ${className}`}>
				<div className='modal-content'>
					<h3 className='modal-title'>{title}</h3>
					{description && <p className='modal-description'>{description}</p>}
					{children}
					<div className='modal-actions'>
						<button className='btn-cancel' onClick={onClose}>
							{cancelText}
						</button>
						<button
							className={`btn-delete ${isDisabled ? 'btn-disabled' : ''}`}
							onClick={handleConfirm}
							disabled={isDisabled}
						>
							{confirmText}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalConfirmacion;