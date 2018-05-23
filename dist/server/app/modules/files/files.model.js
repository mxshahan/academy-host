'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filesModel = exports.filesCrud = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filesSchema = new _mongoose2.default.Schema({
  filename: {
    type: String,
    required: true
  },
  permalink: {
    type: String,
    required: true
  }
});

filesSchema.plugin(_mongooseUniqueValidator2.default);
filesSchema.plugin(_mongooseTimestamp2.default);

const filesModel = _mongoose2.default.model('filesModel', filesSchema);
const filesCrud = new _utility.Crud(filesModel);

exports.filesCrud = filesCrud;
exports.filesModel = filesModel;