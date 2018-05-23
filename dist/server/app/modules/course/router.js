'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.baseUrl = undefined;

var _middlewares = require('../../middlewares');

var _controller = require('./controller');

const baseUrl = exports.baseUrl = '/api/course';

const routes = exports.routes = [{
  method: 'GET',
  route: '/',
  handlers: [_controller.courseAll]
}, {
  method: 'GET',
  route: '/test/:id',
  handlers: [_controller.getCourseTest]
}, {
  method: 'GET',
  route: '/:id',
  handlers: [_controller.courseSingle]
}, {
  method: 'PUT',
  route: '/:id',
  handlers: [_middlewares.isAuthenticated, _controller.courseUpdate]
}, {
  method: 'DELETE',
  route: '/:id',
  handlers: [_controller.courseDelete]
}, {
  method: 'POST',
  route: '/',
  handlers: [_middlewares.isAuthenticated, _controller.courseCreate]
}, {
  method: 'POST',
  route: '/test',
  handlers: [_middlewares.isAuthenticated, _controller.createTest]
}, {
  method: 'POST',
  route: '/lecture',
  handlers: [_middlewares.isAuthenticated, _controller.lectureCreate]
}, {
  method: 'POST',
  route: '/content',
  handlers: [_middlewares.isAuthenticated, _controller.contentCreate]
}, {
  method: 'POST',
  route: '/enroll',
  handlers: [_middlewares.isAuthenticated, _controller.enrollStudent]
}, {
  method: 'POST',
  route: '/enroll/remove',
  handlers: [_middlewares.isAuthenticated, _controller.enrollRemove]
}];