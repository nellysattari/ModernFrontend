'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import helper from './helper';
var jquery = require('jquery');
var helper = require('./helper');

var myclass = function () {
  function myclass() {
    _classCallCheck(this, myclass);
  }

  _createClass(myclass, [{
    key: 'sum',
    value: function sum(a, b) {
      return a + b;
    }
  }]);

  return myclass;
}();

exports.default = myclass;

