import { useEffect, useState } from 'react';
import '../styles/modal.css';
import { useTranslation } from 'react-i18next';

export const ShelfForm = ({
    open,
    onClose,
    onSubmit,
    defaultName = ''
}) => {
    const { t } = useTranslation();
    const [name, setName] = useState(defaultName);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            setName(defaultName || '');
        }
    }, [open, defaultName]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;

        try {
            setIsSubmitting(true);
            await onSubmit({ name: trimmed });
            onClose();
        } catch (error) {
            console.error('Error al guardar la estantería:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEdit = !!defaultName;

    return (
        <>
            <div className='modal-background' onClick={onClose} />
            <div className='modal-container'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h3 className='modal-title'>
                            {isEdit
                                ? t('shelves.form.editTitle')
                                : t('shelves.form.addTitle')}
                        </h3>
                        <p className='modal-description'>
                            {isEdit
                                ? t('shelves.form.editDescription')
                                : t('shelves.form.addDescription')}
                        </p>
                    </div>

                    <form className='modal-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='shelf-name'>
                                {t('shelves.form.nameLabel')}
                            </label>
                            <input
                                id='shelf-name'
                                type='text'
                                className='input'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={60}
                            />
                        </div>

                        <div className='modal-actions'>
                            <button
                                type='button'
                                className='btn-cancel'
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                {t('common.actions.cancel')}
                            </button>
                            <button
                                type='submit'
                                className='btn-confirm'
                                disabled={isSubmitting || !name.trim()}
                            >
                                {isEdit
                                    ? t('shelves.form.btnSave')
                                    : t('shelves.form.btnCreate')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};