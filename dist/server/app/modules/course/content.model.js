'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contentModel = exports.contentCrud = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contentSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    required: true
  },
  ctType: {
    type: String,
    default: 'Video'
  },
  order: {
    type: Number,
    default: null
  },
  file: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'filesModel'
  }
});

contentSchema.plugin(_mongooseUniqueValidator2.default);
contentSchema.plugin(_mongooseTimestamp2.default);

const contentModel = _mongoose2.default.model('contentModel', contentSchema);
const contentCrud = new _utility.Crud(contentModel);

exports.contentCrud = contentCrud;
exports.contentModel = contentModel;