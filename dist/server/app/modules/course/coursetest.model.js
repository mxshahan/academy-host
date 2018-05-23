'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testCrud = exports.testModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _utility = require('../../utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const courseTestSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [{
    question: {
      type: String
    },
    answers: [{
      answer: {
        type: String
      },
      correct: {
        type: String
      }
    }]
  }],
  course: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'courseModel',
    required: true
  }
});

courseTestSchema.plugin(_mongooseUniqueValidator2.default);
courseTestSchema.plugin(_mongooseTimestamp2.default);

const testModel = _mongoose2.default.model('testModel', courseTestSchema);
const testCrud = new _utility.Crud(testModel);

exports.testModel = testModel;
exports.testCrud = testCrud;