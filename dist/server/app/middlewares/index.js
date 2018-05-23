'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authenticated = require('./authenticated');

Object.defineProperty(exports, 'isAuthenticated', {
  enumerable: true,
  get: function () {
    return _authenticated.isAuthenticated;
  }
});
Object.defineProperty(exports, 'isArtist', {
  enumerable: true,
  get: function () {
    return _authenticated.isArtist;
  }
});
Object.defineProperty(exports, 'isPromoter', {
  enumerable: true,
  get: function () {
    return _authenticated.isPromoter;
  }
});
Object.defineProperty(exports, 'isClub', {
  enumerable: true,
  get: function () {
    return _authenticated.isClub;
  }
});
Object.defineProperty(exports, 'isAdmin', {
  enumerable: true,
  get: function () {
    return _authenticated.isAdmin;
  }
});