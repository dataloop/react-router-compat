'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _DOMHistory2 = require('./DOMHistory');

var _DOMHistory3 = _interopRequireDefault(_DOMHistory2);

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

var _DOMUtils = require('./DOMUtils');

var _URLUtils = require('./URLUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultQueryKey = '_qk';

function ensureSlash() {
  var path = (0, _DOMUtils.getHashPath)();

  if ((0, _URLUtils.isAbsolutePath)(path)) return true;

  (0, _DOMUtils.replaceHashPath)('/' + path);

  return false;
}

function addQueryStringValueToPath(path, key, value) {
  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
}

function getQueryStringValueFromPath(path, key) {
  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
  return match && match[1];
}

function saveState(path, queryKey, state) {
  window.sessionStorage.setItem(state.key, JSON.stringify(state));
  return addQueryStringValueToPath(path, queryKey, state.key);
}

function readState(path, queryKey) {
  var sessionKey = getQueryStringValueFromPath(path, queryKey);
  var json = sessionKey && window.sessionStorage.getItem(sessionKey);

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON in session storage.
    }
  }

  return null;
}

function updateCurrentState(queryKey, extraState) {
  var path = (0, _DOMUtils.getHashPath)();
  var state = readState(path, queryKey);

  if (state) saveState(path, queryKey, Object.assign(state, extraState));
}

/**
 * A history implementation for DOM environments that uses window.location.hash
 * to store the current path. This is essentially a hack for older browsers that
 * do not support the HTML5 history API (IE <= 9).
 *
 * Support for persistence of state across page refreshes is provided using a
 * combination of a URL query string parameter and DOM storage. However, this
 * support is not enabled by default. In order to use it, create your own
 * HashHistory.
 *
 *   import HashHistory from 'react-router/lib/HashHistory';
 *   var StatefulHashHistory = new HashHistory({ queryKey: '_key' });
 *   React.render(<Router history={StatefulHashHistory} .../>, ...);
 */

var HashHistory = function (_DOMHistory) {
  _inherits(HashHistory, _DOMHistory);

  function HashHistory() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HashHistory);

    var _this = _possibleConstructorReturn(this, (HashHistory.__proto__ || Object.getPrototypeOf(HashHistory)).call(this, options));

    _this.handleHashChange = _this.handleHashChange.bind(_this);
    _this.queryKey = options.queryKey;

    if (typeof _this.queryKey !== 'string') _this.queryKey = _this.queryKey ? DefaultQueryKey : null;
    return _this;
  }

  _createClass(HashHistory, [{
    key: '_updateLocation',
    value: function _updateLocation(navigationType) {
      var path = (0, _DOMUtils.getHashPath)();
      var state = this.queryKey ? readState(path, this.queryKey) : null;
      this.location = this.createLocation(path, state, navigationType);
    }
  }, {
    key: 'setup',
    value: function setup() {
      if (this.location == null) {
        ensureSlash();
        this._updateLocation();
      }
    }
  }, {
    key: 'handleHashChange',
    value: function handleHashChange() {
      if (!ensureSlash()) return;

      if (this._ignoreNextHashChange) {
        this._ignoreNextHashChange = false;
      } else {
        this._updateLocation(_NavigationTypes2.default.POP);
        this._notifyChange();
      }
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      _get(HashHistory.prototype.__proto__ || Object.getPrototypeOf(HashHistory.prototype), 'addChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 1) {
        if (window.addEventListener) {
          window.addEventListener('hashchange', this.handleHashChange, false);
        } else {
          window.attachEvent('onhashchange', this.handleHashChange);
        }
      }
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      _get(HashHistory.prototype.__proto__ || Object.getPrototypeOf(HashHistory.prototype), 'removeChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 0) {
        if (window.removeEventListener) {
          window.removeEventListener('hashchange', this.handleHashChange, false);
        } else {
          window.detachEvent('onhashchange', this.handleHashChange);
        }
      }
    }
  }, {
    key: 'pushState',
    value: function pushState(state, path) {
      (0, _warning2.default)(this.queryKey || state == null, 'HashHistory needs a queryKey in order to persist state');

      if (this.queryKey) updateCurrentState(this.queryKey, this.getScrollPosition());

      state = this._createState(state);

      if (this.queryKey) path = saveState(path, this.queryKey, state);

      this._ignoreNextHashChange = true;
      window.location.hash = path;

      this.location = this.createLocation(path, state, _NavigationTypes2.default.PUSH);

      this._notifyChange();
    }
  }, {
    key: 'replaceState',
    value: function replaceState(state, path) {
      state = this._createState(state);

      if (this.queryKey) path = saveState(path, this.queryKey, state);

      this._ignoreNextHashChange = true;
      (0, _DOMUtils.replaceHashPath)(path);

      this.location = this.createLocation(path, state, _NavigationTypes2.default.REPLACE);

      this._notifyChange();
    }
  }, {
    key: 'makeHref',
    value: function makeHref(path) {
      return '#' + path;
    }
  }]);

  return HashHistory;
}(_DOMHistory3.default);

var history = exports.history = new HashHistory();
exports.default = HashHistory;