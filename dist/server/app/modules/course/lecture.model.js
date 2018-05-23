'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lectureModel = exports.lectureCrud = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lectureSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    reuired: true
  },
  content: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'contentModel'
  }]
});

lectureSchema.plugin(_mongooseUniqueValidator2.default);
lectureSchema.plugin(_mongooseTimestamp2.default);

const lectureModel = _mongoose2.default.model('lectureModel', lectureSchema);
const lectureCrud = new _utility.Crud(lectureModel);

exports.lectureCrud = lectureCrud;
exports.lectureModel = lectureModel;