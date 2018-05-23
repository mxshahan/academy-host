'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api/payment';

const routes = exports.routes = [{
  method: 'GET',
  route: '/',
  handlers: [_controller.paymentAll]
}, {
  method: 'GET',
  route: '/:id',
  handlers: [_controller.paymentSingle]
}, {
  method: 'PUT',
  route: '/:id',
  handlers: [_controller.paymentUpdate]
}, {
  method: 'DELETE',
  route: '/:id',
  handlers: [_controller.paymentDelete]
}, {
  method: 'POST',
  route: '/',
  handlers: [_controller.paymentCreate]
}];