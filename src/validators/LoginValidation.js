// eslint-disable-next-line import/no-extraneous-dependencies
const { body } = require('express-validator');

exports.loginValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];
