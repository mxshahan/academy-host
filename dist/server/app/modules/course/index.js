'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseModel = exports.courseController = exports.courseRouteProps = undefined;

var _router = require('./router');

var _courseRouteProps = _interopRequireWildcard(_router);

var _controller = require('./controller');

var _courseController = _interopRequireWildcard(_controller);

var _course = require('./course.model');

var _courseModel = _interopRequireWildcard(_course);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.courseRouteProps = _courseRouteProps;
exports.courseController = _courseController;
exports.courseModel = _courseModel;