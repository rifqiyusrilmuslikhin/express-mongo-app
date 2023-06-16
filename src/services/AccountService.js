// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const Account = require('../models/Account');
const UnauthorizedError = require('../exceptions/UnauthorizedError');
const ForbiddenError = require('../exceptions/ForbiddenError');
const NotFoundError = require('../exceptions/NotFoundError');

class AccountService {
  async registerAccount(email, password, passwordConfirm, name, address, cityId, hobbies) {
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      throw new ForbiddenError('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = new Account({
      email,
      password: hashedPassword,
      name,
      address,
      cityId,
      hobbies,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    return await account.save();
  }

  async login(email, password) {
    const account = await Account.findOne({ email });
    if (!account) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    account.last_login = Date.now();
    await account.save();

    return account;
  }

  async getAllAccounts(pageNumber, pageSize) {
    const totalCount = await Account.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const accounts = await Account.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return {
      accounts,
      page: pageNumber,
      limit: pageSize,
      totalPages,
      totalCount,
    };
  }

  async getAccountById(accountId) {
    return await Account.findById(accountId).select('-__v');
  }

  async updatePassword(accountId, currentPassword, newPassword, passwordConfirm) {
    const account = await Account.findById(accountId);
  
    if (!account) {
      throw new NotFoundError('Account not found');
    }
  
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, account.password);
    if (!isCurrentPasswordValid) {
      throw new ForbiddenError('Invalid current password');
    }
  
    if (newPassword !== passwordConfirm) {
      throw new ForbiddenError('Password confirmation does not match');
    }
  
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    account.password = hashedNewPassword;
    account.updated_at = Date.now();
  
    await account.save();
  
    return account;
  }

  async deleteAccount(accountId) {
    const account = await Account.findById(accountId);
  
    if (!account) {
      throw new NotFoundError('Account not found');
    }
  
    await Account.deleteOne({ _id: accountId });
  
    return { success: true };
  }
}

module.exports = AccountService;
