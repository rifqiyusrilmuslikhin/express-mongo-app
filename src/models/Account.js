/* eslint-disable no-param-reassign */
// /* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  last_login: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

accountSchema.set('toJSON', {
  transform(doc, ret) {
    ret.created_at = ret.created_at.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    ret.updated_at = ret.updated_at.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    ret.last_login = ret.last_login ? ret.last_login.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '') : null;
    return ret;
  },
});

const Account = mongoose.model('Account', accountSchema, 'account');

module.exports = Account;
