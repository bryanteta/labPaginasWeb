import {body, validationResult} from 'express-validator';

export const runValidations = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({status: 'error', errors: errors.array()});
    };
};

export const createUserValidators = [

    body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

    body('apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es obligatorio'),

    body('clave')
    .isLength({ min: 6 })
    .withMessage('La clave debe tener al menos 6 caracteres')
]

export const createPublicacionValidators = [

    body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El titulo es obligatorio'),

    body('descripcion')
    .trim()
    .notEmpty()
    .withMessage('El descripcion es obligatorio'),
]