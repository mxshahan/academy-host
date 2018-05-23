'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _bcryptjs = require('bcryptjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  acc_type: {
    type: String,
    default: 'student'
  },
  jwt: {
    type: String,
    default: null
  },
  social: {
    facebook: {
      id: String,
      token: String
    },
    twitter: {
      id: String,
      token: String
    }
  },
  authorCourse: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'courseModel',
    default: null
  }],
  studentCourse: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'studentModel',
    default: null
  }]
});

authSchema.pre('save', function hashPass(next) {
  const account = this;
  let hash;
  if (this.isModified('password') || this.isNew) {
    if (account.password) {
      try {
        const salt = (0, _bcryptjs.genSaltSync)();
        hash = (0, _bcryptjs.hashSync)(account.password, salt);
      } catch (e) {
        return next(e);
      } finally {
        account.password = hash;
      }
    }
  }
  return next();
});

authSchema.plugin(_mongooseUniqueValidator2.default);
authSchema.plugin(_mongooseTimestamp2.default);

const authModel = _mongoose2.default.model('authModel', authSchema);

exports.default = authModel;