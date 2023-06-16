/* eslint-disable camelcase */
/* eslint-disable radix */
// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const AccountService = require('../services/AccountService');
const CityService = require('../services/CityService');
const ForbiddenError = require('../exceptions/ForbiddenError');
const NotFoundError = require('../exceptions/NotFoundError');

class AccountController {
  constructor() {
    this.accountService = new AccountService();
    this.cityService = new CityService();
  }

  async registerAccount(req, res, next) {
    try {
      const {
        email, password, passwordConfirm, name, address, cityId, hobbies 
      } = req.body;

      if (!isValidObjectId(cityId)) {
        throw new NotFoundError('City not found');
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ForbiddenError(errors.array()[0].msg);
      }

      const account = await this.accountService.registerAccount(
        email,
        password,
        passwordConfirm,
        name,
        address,
        cityId,
        hobbies
      );

      res.status(201).json({ success: true, data: account });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new UnauthorizedError(errors.array()[0].msg);
      }

      const account = await this.accountService.login(email, password);

      res.status(200).json({ success: true, data: account });
    } catch (error) {
      next(error);
    }
  }

  async getAllAccounts(req, res, next) {
    try {
      const { page, limit } = req.query;
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      const accounts = await this.accountService.getAllAccounts(pageNumber, pageSize);

      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  }

  async getAccountById(req, res, next) {
    try {
      const accountId = req.params.id;
      if (!isValidObjectId(accountId)) {
        throw new NotFoundError('Account not found');
      }
      const account = await this.accountService.getAccountById(accountId);

      if (!account) {
        throw new NotFoundError('Account not found');
      }

      const {
        _id, email, name, address, cityId, hobbies, last_login, created_at, updated_at 
      } = account;
      const city = await this.cityService.getCityById(cityId);

      const response = {
        id: _id,
        email,
        profile: {
          name, address, city, hobbies 
        },
        last_login,
        created_at,
        updated_at,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword, passwordConfirm } = req.body;
      const accountId = req.params.id;

      if (!isValidObjectId(accountId)) {
        throw new NotFoundError('Account not found');
      }
  
      const updatedAccount = await this.accountService.updatePassword(accountId, currentPassword, newPassword, passwordConfirm);
  
      res.status(201).json({ success: true, data: updatedAccount });
    } catch (error) {
      next(error);
    }
  }
  
  async deleteAccount(req, res, next) {
    try {
      const accountId = req.params.id;

      if (!isValidObjectId(accountId)) {
        throw new NotFoundError('Account not found');
      }

      await this.accountService.deleteAccount(accountId);

      res.status(201).json({ success: true, message: 'Account deleted successfully' });
    } catch (error) {
      next(error); 
    }
  }
}

module.exports = AccountController;
