// eslint-disable-next-line import/no-extraneous-dependencies
const { body } = require('express-validator');

exports.registerValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('password_confirm').custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('address').notEmpty().withMessage('Address is required').isString().withMessage('Address must be a string'),
  body('cityId').notEmpty().withMessage('City ID is required'),
  body('hobbies')
    .isArray({ min: 1 }).withMessage('At least one hobby is required')
    .custom((value) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const hobby of value) {
        if (typeof hobby !== 'string') {
          throw new Error('Hobbies must be strings');
        }
      }
      return true;
    }),
];
