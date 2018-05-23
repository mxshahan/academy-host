'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCourseTest = exports.enrollRemove = exports.enrollStudent = exports.createTest = exports.contentCreate = exports.lectureCreate = exports.courseDelete = exports.courseUpdate = exports.courseCreate = exports.courseSingle = exports.courseAll = undefined;

var _course = require('./course.service');

var _course2 = _interopRequireDefault(_course);

var _coursetest = require('./coursetest.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let courses;
let course;
let courseNew;

const courseAll = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    try {
      courses = yield _course2.default.get();
    } catch (e) {
      ctx.throw(404, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          courses
        },
        message: 'Course created successfully'
      };
    }
  });

  return function courseAll(_x) {
    return _ref.apply(this, arguments);
  };
})();

const courseSingle = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    try {
      course = yield _course2.default.single({
        qr: {
          _id: ctx.params.id
        },
        select: 'title category description lecture author price students',
        populate: [{
          path: 'lecture',
          model: 'lectureModel',
          populate: [{
            path: 'content',
            model: 'contentModel',
            populate: [{
              path: 'file',
              model: 'filesModel'
            }]
          }]
        }, {
          path: 'author',
          model: 'authModel',
          select: 'name'
        }]
      });
    } catch (e) {
      ctx.throw(404, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          course
        },
        message: 'Course found'
      };
    }
  });

  return function courseSingle(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const courseCreate = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    const {
      title,
      category,
      description
    } = ctx.request.body;
    try {
      courseNew = yield _course2.default.createCourse({
        title,
        category,
        description,
        author: ctx.state.user.uid
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          course: courseNew
        },
        message: 'Course created successfully'
      };
    }
  });

  return function courseCreate(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const courseUpdate = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    try {
      course = yield _course2.default.put({
        params: {
          qr: {
            _id: ctx.params.id
          }
        },
        body: ctx.request.body
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        body: course
      };
    }
  });

  return function courseUpdate(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const courseDelete = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx) {
    try {
      course = yield _course2.default.delete({ _id: ctx.params.id });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        body: course
      };
    }
  });

  return function courseDelete(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

const lectureCreate = (() => {
  var _ref6 = _asyncToGenerator(function* (ctx) {
    const {
      crId,
      title
    } = ctx.request.body;
    try {
      courseNew = yield _course2.default.addLecture({
        params: {
          qr: {
            _id: crId
          }
        },
        body: {
          title
        }
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          lecture: courseNew
        },
        message: 'Lecture created successfully'
      };
    }
  });

  return function lectureCreate(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

const contentCreate = (() => {
  var _ref7 = _asyncToGenerator(function* (ctx) {
    const {
      title,
      fileId,
      ctType,
      order,
      lectureId
    } = ctx.request.body;
    try {
      courseNew = yield _course2.default.addContent({
        params: {
          qr: {
            _id: lectureId
          }
        },
        body: {
          title,
          file: fileId,
          ctType,
          order
        }
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          content: courseNew
        },
        message: 'Content created successfully'
      };
    }
  });

  return function contentCreate(_x7) {
    return _ref7.apply(this, arguments);
  };
})();

const createTest = (() => {
  var _ref8 = _asyncToGenerator(function* (ctx) {
    try {
      courseNew = yield _course2.default.createTest(ctx.request.body);
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          test: courseNew
        },
        message: 'Test created successfully'
      };
    }
  });

  return function createTest(_x8) {
    return _ref8.apply(this, arguments);
  };
})();

const enrollStudent = (() => {
  var _ref9 = _asyncToGenerator(function* (ctx) {
    try {
      yield _course2.default.enrollStudent({
        params: {
          qr: {
            _id: ctx.request.body.crId
          }
        },
        body: {
          uid: ctx.state.user.uid
        }
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        message: 'Student enrolled'
      };
    }
  });

  return function enrollStudent(_x9) {
    return _ref9.apply(this, arguments);
  };
})();

const enrollRemove = (() => {
  var _ref10 = _asyncToGenerator(function* (ctx) {
    try {
      yield _course2.default.removeEnroll({
        params: {
          qr: {
            _id: ctx.request.body.crId
          }
        },
        body: {
          uid: ctx.state.user.uid
        }
      });
    } catch (e) {
      ctx.throw(422, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        message: 'Course removed'
      };
    }
  });

  return function enrollRemove(_x10) {
    return _ref10.apply(this, arguments);
  };
})();

const getCourseTest = (() => {
  var _ref11 = _asyncToGenerator(function* (ctx) {
    try {
      course = yield _coursetest.testCrud.single({
        qr: {
          _id: ctx.params.id
        }
      });
    } catch (e) {
      ctx.throw(404, {
        success: 0,
        message: e.message
      });
    } finally {
      ctx.body = {
        success: 1,
        data: {
          test: course
        },
        message: 'Course found'
      };
    }
  });

  return function getCourseTest(_x11) {
    return _ref11.apply(this, arguments);
  };
})();

exports.courseAll = courseAll;
exports.courseSingle = courseSingle;
exports.courseCreate = courseCreate;
exports.courseUpdate = courseUpdate;
exports.courseDelete = courseDelete;
exports.lectureCreate = lectureCreate;
exports.contentCreate = contentCreate;
exports.createTest = createTest;
exports.enrollStudent = enrollStudent;
exports.enrollRemove = enrollRemove;
exports.getCourseTest = getCourseTest;