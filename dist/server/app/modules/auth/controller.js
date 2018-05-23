'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMembers = exports.getMyCourseStudent = exports.getMyCourseAuthor = exports.logMeOut = exports.deleteMe = exports.updateMe = exports.getOther = exports.getMe = exports.authSocial = exports.authLocal = undefined;

var _bcryptjs = require('bcryptjs');

var _utility = require('../../utility');

var _user = require('./user.service');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let auth;
let jwt;
let record;

const tokenGenerator = (() => {
  var _ref = _asyncToGenerator(function* (data) {
    jwt = yield (0, _utility.generateJwt)(data);

    yield _user2.default.put({
      params: {
        qr: {
          _id: data.uid
        }
      },
      body: {
        jwt
      }
    });
    return jwt;
  });

  return function tokenGenerator(_x) {
    return _ref.apply(this, arguments);
  };
})();

/**
 * @api {post} /api/auth/local Local signup and login
 * @apiName Local auth
 * @apiGroup Authentication
 * @apiParam {String} username User's username
 * @apiParam {String} password User's password
 * @apiParam {String} email User's email
 * @apiParam {String} signup Use this as hidden field for signing up
 * @apiParamExample {json} Signup
 *    {
 *      "username": "smitray1",
 *      "password": "hello",
 *      "email": "so11eme@somew.com",
 *      "signup": true
 *    }
 * @apiParamExample {json} Login
 *    {
 *      "username": "smitray1", // Or email address but field name remains 'username'
 *      "password": "hello"
 *    }
 * @apiSuccess {Object[]} auth
 * @apiSuccess {String} auth.data.token JWT token
 * @apiSuccess {String} auth.message Success message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "token": "Bearer [JWT TOKEN]"
 *      },
 *      "message": "Loggedin successfully"
 *    }
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Email or Username exists
 *    HTTP/1.1 409 Record conflict
 * @apiErrorExample {json} Wrong credentials
 *    HTTP/1.1 401 Not authorized
 * @apiErrorExample {json} Wrong form key
 *    HTTP/1.1 422 Unprocessable entity
 */

const authLocal = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    const {
      name,
      username,
      password,
      email,
      accType,
      signup
    } = ctx.request.body;
    auth = yield _user2.default.single({
      qr: {
        $or: [{
          username
        }, {
          email: username
        }]
      }
    });
    if (signup && !auth) {
      try {
        auth = yield _user2.default.create({
          name,
          username,
          password,
          email,
          acc_type: accType
        });
      } catch (e) {
        ctx.throw(422, {
          success: 0,
          message: e.message
        });
      }
    } else if (signup && auth) {
      ctx.throw(409, { success: 0, message: 'Email or username already registered!!' });
    } else if (!auth) {
      ctx.throw(401, { success: 0, message: 'No user found' });
    } else if (auth && !(0, _bcryptjs.compareSync)(password, auth.password)) {
      ctx.throw(401, { success: 0, message: 'Password given is wrong' });
    }
    const token = yield tokenGenerator({
      uid: auth._id,
      acc_type: auth.acc_type
    });
    ctx.body = {
      success: 1,
      token,
      acc_type: auth.acc_type,
      message: 'Loggedin successfully'
    };
  });

  return function authLocal(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

/**
 * @api {post} /api/auth/social Signup or login using facebook, google and twitter
 * @apiName Social auth
 * @apiGroup Authentication
 * @apiParam {String} username User's username from social network
 * @apiParam {String} email User's email
 * @apiParam {String} scId Social network's ID
 * @apiParam {String} scToken Social network's token
 * @apiParam {String} scType Social network type. E.g. facebook, twitter, google
 * @apiParamExample {json} Input
 *    {
 *      "username": "smitray1",
 *      "email": "so11eme@somew.com",
 *      "scId": "12345",
 *      "scToken": "12345",
 *      "scType": "facebook"
 *    }
 * @apiSuccess {Object[]} auth
 * @apiSuccess {String} auth.data.token JWT token
 * @apiSuccess {String} auth.message Success message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "token": "Bearer [JWT TOKEN]"
 *      },
 *      "message": "Loggedin successfully"
 *    }
 * @apiErrorExample {json} Server error
 *    HTTP/1.1 500 Internal Server Error
 * @apiErrorExample {json} Email or Username exists
 *    HTTP/1.1 409 Record conflict
 * @apiErrorExample {json} Wrong credentials
 *    HTTP/1.1 401 Not authorized
 * @apiErrorExample {json} Wrong form key
 *    HTTP/1.1 422 Unprocessable entity
 */

const authSocial = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    const {
      username,
      email,
      scId,
      scToken,
      scType
    } = ctx.request.body;

    const qr = {};
    qr.username = username;
    qr[`social.${scType}.id`] = scId;

    auth = yield _user2.default.single({
      qr
    });

    if (!auth) {
      try {
        auth = yield _user2.default.create({
          username,
          email,
          social: {
            [scType]: {
              id: scId,
              token: scToken
            }
          }
        });
      } catch (e) {
        ctx.throw(422, {
          success: 0,
          message: e.message
        });
      }
    }

    const token = yield tokenGenerator({
      uid: auth._id,
      acc_type: auth.acc_type
    });
    // ctx.session.token = token;
    ctx.body = {
      success: 1,
      data: {
        token
      },
      message: 'Loggedin successfully'
    };
  });

  return function authSocial(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const getMe = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.single({
        qr: {
          _id: ctx.state.user.uid
        },
        select: 'username email name acc_type'
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        success: 1,
        data: {
          user: record
        },
        message: 'User found'
      };
    }
  });

  return function getMe(_x4) {
    return _ref4.apply(this, arguments);
  };
})();
const getMyCourseAuthor = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.single({
        qr: {
          _id: ctx.state.user.uid
        },
        select: 'authorCourse',
        populate: [{
          path: 'authorCourse',
          model: 'courseModel'
        }]
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        success: 1,
        data: {
          course: record
        },
        message: 'Author courses'
      };
    }
  });

  return function getMyCourseAuthor(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

const getMyCourseStudent = (() => {
  var _ref6 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.single({
        qr: {
          _id: ctx.state.user.uid
        },
        select: 'studentCourse',
        populate: [{
          path: 'studentCourse',
          model: 'courseModel',
          select: 'title createdAt courseTest',
          populate: [{
            path: 'courseTest',
            model: 'testModel'
          }]
        }]
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        success: 1,
        data: {
          course: record
        },
        message: 'Student courses'
      };
    }
  });

  return function getMyCourseStudent(_x6) {
    return _ref6.apply(this, arguments);
  };
})();

const getOther = (() => {
  var _ref7 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.single({
        qr: {
          _id: ctx.params.id
        },
        select: 'username email name acc_type course',
        populate: [{
          path: 'course',
          model: 'courseModel',
          select: 'title category created_at'
        }]
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        success: 1,
        data: {
          user: record
        },
        message: 'User found'
      };
    }
  });

  return function getOther(_x7) {
    return _ref7.apply(this, arguments);
  };
})();

const updateMe = (() => {
  var _ref8 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.put({
        params: {
          qr: {
            _id: ctx.state.user.uid
          }
        },
        body: ctx.request.body
      });
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      ctx.body = {
        success: 1,
        data: {
          user: record
        },
        message: 'User updated'
      };
    }
  });

  return function updateMe(_x8) {
    return _ref8.apply(this, arguments);
  };
})();

const deleteMe = (() => {
  var _ref9 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.delete({
        params: {
          qr: {
            _id: ctx.params.id
          }
        }
      });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        success: 1,
        data: {
          user: record
        },
        message: 'User deleted'
      };
    }
  });

  return function deleteMe(_x9) {
    return _ref9.apply(this, arguments);
  };
})();

const logMeOut = (() => {
  var _ref10 = _asyncToGenerator(function* (ctx) {
    ctx.cookies.set('token', '');
    ctx.body = {
      success: 1,
      message: 'User logged out'
    };
  });

  return function logMeOut(_x10) {
    return _ref10.apply(this, arguments);
  };
})();

const getMembers = (() => {
  var _ref11 = _asyncToGenerator(function* (ctx) {
    try {
      record = yield _user2.default.get({
        qr: {
          acc_type: ctx.params.type
        },
        select: 'username name email authorCourse studentCourse'
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
          users: record
        },
        message: 'Users fetched'
      };
    }
  });

  return function getMembers(_x11) {
    return _ref11.apply(this, arguments);
  };
})();

exports.authLocal = authLocal;
exports.authSocial = authSocial;
exports.getMe = getMe;
exports.getOther = getOther;
exports.updateMe = updateMe;
exports.deleteMe = deleteMe;
exports.logMeOut = logMeOut;
exports.getMyCourseAuthor = getMyCourseAuthor;
exports.getMyCourseStudent = getMyCourseStudent;
exports.getMembers = getMembers;