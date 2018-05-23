'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utility = require('../../utility');

var _course = require('./course.model');

var _course2 = _interopRequireDefault(_course);

var _lecture = require('./lecture.model');

var _content = require('./content.model');

var _coursetest = require('./coursetest.model');

var _files = require('../files');

var _auth = require('../auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { filesCrud } = _files.filesModel;

class CourseService extends _utility.Crud {
  constructor(model) {
    super(model);
    this.model = model;
    this.lectureCrud = _lecture.lectureCrud;
    this.contentCrud = _content.contentCrud;
    this.filesCrud = filesCrud;
    this.userCrud = _auth.userCrud;
    this.testCrud = _coursetest.testCrud;
    this._ = _lodash2.default;

    this.authModel = _auth.authModel;
  }

  createCourse(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const {
        title,
        category,
        description,
        author
      } = options;

      const record = yield _this.create({
        title,
        category,
        description,
        author
      });

      const user = yield _this.userCrud.single({
        qr: {
          _id: author
        }
      });

      user.authorCourse.push(record._id);

      return new Promise(function (resolve, reject) {
        user.save().then(function () {
          resolve(record);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }

  createTest(options) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const testRecord = yield _this2.testCrud.create(options);
      const record = yield _this2.single({
        qr: {
          _id: options.course
        }
      });
      record.courseTest = testRecord._id;
      return new Promise(function (resolve, reject) {
        record.save().then(function () {
          resolve(testRecord);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }

  addLecture(options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const lecture = yield _this3.lectureCrud.create(options.body);
      const record = yield _this3.single(options.params);
      record.lecture.push(lecture._id);
      return new Promise(function (resolve, reject) {
        record.save().then(function () {
          resolve(lecture);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }

  addContent(options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const {
        title,
        file,
        ctType,
        order
      } = options.body;
      const content = yield _this4.contentCrud.create({
        title,
        ctType,
        order,
        file
      });
      const record = yield _this4.lectureCrud.single(options.params);
      record.content.push(content._id);
      return new Promise(function (resolve, reject) {
        record.save().then(function () {
          resolve(content);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }

  enrollStudent(options) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      const record = yield _this5.single(options.params);
      record.students.push(options.body.uid);
      const user = yield _this5.userCrud.single({
        qr: {
          _id: options.body.uid
        }
      });
      user.studentCourse.push(record._id);
      yield user.save();
      return new Promise(function (resolve, reject) {
        record.save().then(function (result) {
          resolve(result);
        }).catch(function (e) {
          reject(e);
        });
      });
    })();
  }

  removeEnroll(options) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      return new Promise((() => {
        var _ref = _asyncToGenerator(function* (resolve, reject) {
          let record;
          let user;
          try {
            record = yield _this6.singleUpdate({
              qr: options.params.qr,
              opt: {
                $pull: {
                  students: options.body.uid
                }
              }
            });
            user = yield _this6.userCrud.singleUpdate({
              qr: {
                _id: options.body.uid
              },
              select: 'studentCourse',
              populate: [{
                path: 'studentCourse',
                model: 'courseModel',
                select: 'title createdAt courseTest'
              }],
              opt: {
                $pull: {
                  studentCourse: record._id
                }
              }
            });
          } catch (e) {
            reject(e);
          } finally {
            resolve(user);
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      })());
    })();
  }
}

const courseCrud = new CourseService(_course2.default);

exports.default = courseCrud;