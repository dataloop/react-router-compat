'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _URLUtils = require('./URLUtils');

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequiredHistorySubclassMethods = ['pushState', 'replaceState', 'go'];

function createRandomKey() {
  return Math.random().toString(36).substr(2);
}

/**
 * A history interface that normalizes the differences across
 * various environments and implementations. Requires concrete
 * subclasses to implement the following methods:
 *
 * - pushState(state, path)
 * - replaceState(state, path)
 * - go(n)
 */

var History = function () {
  function History() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, History);

    RequiredHistorySubclassMethods.forEach(function (method) {
      (0, _invariant2.default)(typeof this[method] === 'function', '%s needs a "%s" method', this.constructor.name, method);
    }, this);

    this.parseQueryString = options.parseQueryString || _URLUtils.parseQueryString;
    this.changeListeners = [];
    this.location = null;
  }

  _createClass(History, [{
    key: '_notifyChange',
    value: function _notifyChange() {
      for (var i = 0, len = this.changeListeners.length; i < len; ++i) {
        this.changeListeners[i].call(this);
      }
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      this.changeListeners.push(listener);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      this.changeListeners = this.changeListeners.filter(function (li) {
        return li !== listener;
      });
    }
  }, {
    key: 'back',
    value: function back() {
      this.go(-1);
    }
  }, {
    key: 'forward',
    value: function forward() {
      this.go(1);
    }
  }, {
    key: '_createState',
    value: function _createState(state) {
      state = state || {};

      if (!state.key) state.key = createRandomKey();

      return state;
    }
  }, {
    key: 'createLocation',
    value: function createLocation(path, state, navigationType) {
      var pathname = (0, _URLUtils.getPathname)(path);
      var queryString = (0, _URLUtils.getQueryString)(path);
      var query = queryString ? this.parseQueryString(queryString) : null;
      return new _Location2.default(pathname, query, state, navigationType);
    }
  }]);

  return History;
}();

exports.default = History;