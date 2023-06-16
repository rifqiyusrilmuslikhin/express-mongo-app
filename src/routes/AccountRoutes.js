const AccountController = require('../controllers/AccountController');
const { registerValidation } = require('../validators/RegisterValidation');
const { loginValidation } = require('../validators/LoginValidation');

const accountController = new AccountController();

module.exports = (app) => {
  app.post('/api/register', registerValidation, accountController.registerAccount.bind(accountController));
  app.post('/api/login', loginValidation, accountController.login.bind(accountController));
  app.get('/api/accounts', accountController.getAllAccounts.bind(accountController));
  app.get('/api/accounts/:id', accountController.getAccountById.bind(accountController));
  app.put('/api/accounts/:id', accountController.updatePassword.bind(accountController));
  app.delete('/api/accounts/:id', accountController.deleteAccount.bind(accountController));
};
