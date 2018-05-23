'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseUrl = exports.baseUrl = '/api/files';

const routes = exports.routes = [{
  method: 'POST',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller2.default]
}];