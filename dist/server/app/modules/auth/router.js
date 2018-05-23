'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api';

const routes = exports.routes = [{
  method: 'POST',
  route: '/auth/local',
  handlers: [_controller.authLocal]
}, {
  method: 'POST',
  route: '/auth/social',
  handlers: [_controller.authSocial]
}, {
  method: 'GET',
  route: '/user',
  handlers: [_middlewares.isAuthenticated, _controller.getMe]
}, {
  method: 'GET',
  route: '/user/course/author',
  handlers: [_middlewares.isAuthenticated, _controller.getMyCourseAuthor]
}, {
  method: 'GET',
  route: '/user/course/student',
  handlers: [_middlewares.isAuthenticated, _controller.getMyCourseStudent]
}, {
  method: 'GET',
  route: '/user/logout',
  handlers: [_controller.logMeOut]
}, {
  method: 'PUT',
  route: '/user/other',
  handlers: [_controller.updateMe]
}, {
  method: 'DELETE',
  route: '/user/:id',
  handlers: [_controller.deleteMe]
}, {
  method: 'GET',
  route: '/user/members/:type',
  handlers: [_controller.getMembers]
}, {
  method: 'GET',
  route: '/user/:id',
  handlers: [_controller.getOther]
}];