'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isClub = exports.isPromoter = exports.isArtist = exports.isAuthenticated = undefined;

var _utility = require('../utility');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let token;
let decode;

const isAuthenticated = (() => {
  var _ref = _asyncToGenerator(function* (ctx, next) {
    try {
      token = ctx.request.headers.authorization;
      decode = yield (0, _utility.jwtVerify)(token);
    } catch (e) {
      ctx.throw(401, e.message);
    } finally {
      if (!decode) {
        ctx.throw(401, { message: 'Token has expired' });
      }
      ctx.state.user = decode;
      yield next();
    }
  });

  return function isAuthenticated(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const isArtist = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx, next) {
    if (ctx.state.user.data.acc_type !== 'artist') {
      ctx.throw(401, { message: 'You do not have permission' });
    }
    yield next();
  });

  return function isArtist(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

const isPromoter = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx, next) {
    if (ctx.state.user.data.acc_type !== 'promoter') {
      ctx.throw(401, { message: 'You do not have permission' });
    }
    yield next();
  });

  return function isPromoter(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})();

const isClub = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx, next) {
    if (ctx.state.user.data.acc_type !== 'club') {
      ctx.throw(401, { message: 'You do not have permission' });
    }
    yield next();
  });

  return function isClub(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})();

const isAdmin = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx, next) {
    if (ctx.state.user.data.acc_type !== 'admin') {
      ctx.throw(401, { message: 'You do not have permission' });
    }
    yield next();
  });

  return function isAdmin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})();

exports.isAuthenticated = isAuthenticated;
exports.isArtist = isArtist;
exports.isPromoter = isPromoter;
exports.isClub = isClub;
exports.isAdmin = isAdmin;