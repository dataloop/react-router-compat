'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A Location answers two important questions:
 *
 * 1. Where am I?
 * 2. How did I get here?
 */
var Location = function () {
  _createClass(Location, null, [{
    key: 'isLocation',
    value: function isLocation(object) {
      return object instanceof Location;
    }
  }]);

  function Location() {
    var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var navigationType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _NavigationTypes2.default.POP;

    _classCallCheck(this, Location);

    this.pathname = pathname;
    this.query = query;
    this.state = state;
    this.navigationType = navigationType;
  }

  return Location;
}();

exports.default = Location;