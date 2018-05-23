'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shortid = require('shortid');

var _path = require('path');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _files = require('./files.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let filesNew;

const fileUpload = (() => {
  var _ref = _asyncToGenerator(function* (file) {
    const ext = file.name.split('.');
    const newFilename = `${Date.now()}-${(0, _shortid.generate)()}.${ext[1]}`;
    const filePath = (0, _path.join)(_config2.default.get('paths.static'), newFilename);
    try {
      yield _fsExtra2.default.copy(file.path, filePath);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
    return newFilename;
  });

  return function fileUpload(_x) {
    return _ref.apply(this, arguments);
  };
})();

const bulkUpdate = options => new Promise((resolve, reject) => {
  _files.filesModel.insertMany(options).then(result => {
    resolve(result);
  }).catch(err => {
    reject(err);
  });
});

const filesCreate = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    const rawFiles = ctx.request.body.files.docs;
    const fileNames = [];
    let filename;
    if (rawFiles instanceof Array) {
      yield Promise.all(rawFiles.map((() => {
        var _ref3 = _asyncToGenerator(function* (file) {
          filename = yield fileUpload(file);
          fileNames.push({
            filename,
            permalink: `/public/${filename}`
          });
        });

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      })()));

      try {
        filesNew = yield bulkUpdate(fileNames);
      } catch (e) {
        ctx.throw(422, {
          success: 0,
          message: e.message
        });
      } finally {
        ctx.body = {
          success: 1,
          data: {
            files: filesNew
          },
          message: 'All files uploaded'
        };
      }
    } else {
      filename = yield fileUpload(rawFiles);
      try {
        filesNew = yield _files.filesCrud.create({
          filename,
          permalink: `/public/${filename}`
        });
      } catch (e) {
        ctx.throw(422, e.message);
      } finally {
        ctx.body = {
          success: 1,
          data: {
            files: filesNew
          },
          message: 'File uploaded'
        };
      }
    }
  });

  return function filesCreate(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

exports.default = filesCreate;