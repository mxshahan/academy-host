'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentDelete = exports.paymentUpdate = exports.paymentCreate = exports.paymentSingle = exports.paymentAll = undefined;

var _payment = require('./payment.model');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let payments;
let payment;
let paymentNew;

const paymentAll = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    try {
      payments = yield _payment.paymentCrud.get();
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        body: payments
      };
    }
  });

  return function paymentAll(_x) {
    return _ref.apply(this, arguments);
  };
})();

const paymentSingle = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    try {
      payment = yield _payment.paymentCrud.single({ _id: ctx.params.id });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        body: payment
      };
    }
  });

  return function paymentSingle(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const paymentCreate = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    try {
      paymentNew = yield _payment.paymentCrud.create(ctx.request.body);
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      ctx.body = {
        body: paymentNew
      };
    }
  });

  return function paymentCreate(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

const paymentUpdate = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    try {
      payment = yield _payment.paymentCrud.put({
        params: {
          _id: ctx.params.id
        },
        body: ctx.request.body
      });
    } catch (e) {
      ctx.throw(422, e.message);
    } finally {
      ctx.body = {
        body: payment
      };
    }
  });

  return function paymentUpdate(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

const paymentDelete = (() => {
  var _ref5 = _asyncToGenerator(function* (ctx) {
    try {
      payment = yield _payment.paymentCrud.delete({ _id: ctx.params.id });
    } catch (e) {
      ctx.throw(404, e.message);
    } finally {
      ctx.body = {
        body: payment
      };
    }
  });

  return function paymentDelete(_x5) {
    return _ref5.apply(this, arguments);
  };
})();

exports.paymentAll = paymentAll;
exports.paymentSingle = paymentSingle;
exports.paymentCreate = paymentCreate;
exports.paymentUpdate = paymentUpdate;
exports.paymentDelete = paymentDelete;