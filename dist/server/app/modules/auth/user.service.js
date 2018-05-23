'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utility = require('../../utility');

var _auth = require('./auth.model');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class UserService extends _utility.Crud {
  constructor(model) {
    super(model);
    this.model = model;
  }

  addCourse(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const record = yield _this.single(options.params);
      record.course.push(options.crId);
      return new Promise(function (resolve, reject) {
        record.save().then(function (result) {
          resolve(result);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }

  removeCourse(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let record = yield _this2.single(options.params);
      record = _lodash2.default.remove(record, function (rec) {
        return rec.course._id === options.crId;
      });
      return new Promise(function (resolve, reject) {
        record.save().then(function (result) {
          resolve(result);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }
}

const userCrud = new UserService(_auth2.default);

exports.default = userCrud;