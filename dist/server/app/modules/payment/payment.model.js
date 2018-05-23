'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentModel = exports.paymentCrud = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentSchema = new _mongoose2.default.Schema({});

// paymentSchema.plugin(uniqueValidator);
// paymentSchema.plugin(timestamp);

// import uniqueValidator from 'mongoose-unique-validator';
// import timestamp from 'mongoose-timestamp';
const paymentModel = _mongoose2.default.model('paymentModel', paymentSchema);
const paymentCrud = new _utility.Crud(paymentModel);

exports.paymentCrud = paymentCrud;
exports.paymentModel = paymentModel;