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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const courseSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'review'
  },
  lecture: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'lectureModel',
    default: null
  }],
  courseTest: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'testModel',
    default: null
  },
  students: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'authModel',
    default: null
  }],
  author: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'authModel',
    required: true
  },
  price: {
    type: Number,
    default: 10
  }
});

courseSchema.plugin(_mongooseUniqueValidator2.default);
courseSchema.plugin(_mongooseTimestamp2.default);

const courseModel = _mongoose2.default.model('courseModel', courseSchema);

exports.default = courseModel;