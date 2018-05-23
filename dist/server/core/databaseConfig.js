'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDatabase;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectDatabase() {
  let dbUri;

   if (_config2.default.get('db.options.userName')) {
   dbUri = `mongodb://${_config2.default.get('db.options.userName')}:${_config2.default.get('db.options.passWord')}@${_config2.default.get('db.host')}:${_config2.default.get('db.options.port')}/${_config2.default.get('db.dbName')}`;
   } else {
   dbUri = `mongodb://${_config2.default.get('db.host')}:${_config2.default.get('db.options.port')}/${_config2.default.get('db.dbName')}`;
   }

  dbUri = 'mongodb://root:12345@ds111565.mlab.com:11565/blog'

  return new Promise((resolve, reject) => {
    _mongoose2.default.Promise = global.Promise;
    _mongoose2.default.connection.on('error', error => reject(error)).on('close', () => console.log('Database connection closed.')) // eslint-disable-line no-console
    .once('open', () => resolve(_mongoose2.default.connections[0]));

    _mongoose2.default.connect(dbUri);
  });
}