const NotFoundError = require('../exceptions/NotFoundError');
const UnauthorizedError = require('../exceptions/UnauthorizedError');
const ForbiddenError = require('../exceptions/ForbiddenError');

function errorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof ForbiddenError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = errorHandler;
