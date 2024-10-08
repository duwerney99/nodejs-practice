const { check, validationResult } = require('express-validator');

const validateUserRegister = [
    check('email').isEmail().withMessage('Debe ser un correo válido'),
    check('password').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),
    check('name').notEmpty().withMessage('El nombre es obligatorio'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];



module.exports = {
    validateUserRegister,
};