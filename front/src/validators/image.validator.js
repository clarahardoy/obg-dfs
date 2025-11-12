import Joi from "joi";

export const fileSchema = Joi.any()
    .required()
    .custom((value, helpers) => {
        if (!value || value.length === 0) {
            return helpers.error('any.required');
        }
        const file = value[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return helpers.error('any.invalid');
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB
            return helpers.error('any.max');
        }
        return value;
    })
    .messages({
        'any.required': 'La imagen es obligatoria',
        'any.invalid': 'Solo se permiten JPG, PNG o WEBP',
        'any.max': 'La imagen no puede superar los 2MB',
    });