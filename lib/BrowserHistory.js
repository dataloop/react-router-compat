'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DOMHistory2 = require('./DOMHistory');

var _DOMHistory3 = _interopRequireDefault(_DOMHistory2);

var _DOMUtils = require('./DOMUtils');

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function updateCurrentState(extraState) {
  var state = window.history.state;

  if (state) window.history.replaceState(Object.assign(state, extraState), '');
}

/**
 * A history implementation for DOM environments that support the
 * HTML5 history API (pushState, replaceState, and the popstate event).
 * Provides the cleanest URLs and should always be used in browser
 * environments if possible.
 *
 * Note: BrowserHistory automatically falls back to using full page
 * refreshes if HTML5 history is not available, so URLs are always
 * the same across browsers.
 */

var BrowserHistory = function (_DOMHistory) {
  _inherits(BrowserHistory, _DOMHistory);

  function BrowserHistory(options) {
    _classCallCheck(this, BrowserHistory);

    var _this = _possibleConstructorReturn(this, (BrowserHistory.__proto__ || Object.getPrototypeOf(BrowserHistory)).call(this, options));

    _this.handlePopState = _this.handlePopState.bind(_this);
    _this.isSupported = (0, _DOMUtils.supportsHistory)();
    return _this;
  }

  _createClass(BrowserHistory, [{
    key: '_updateLocation',
    value: function _updateLocation(navigationType) {
      var state = null;

      if (this.isSupported) {
        var historyState = window.history.state;
        state = this._createState(historyState);

        if (!historyState || !historyState.key) window.history.replaceState(state, '');
      }

      this.location = this.createLocation((0, _DOMUtils.getWindowPath)(), state, navigationType);
    }
  }, {
    key: 'setup',
    value: function setup() {
      if (this.location == null) this._updateLocation();
    }
  }, {
    key: 'handlePopState',
    value: function handlePopState(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      this._updateLocation(_NavigationTypes2.default.POP);
      this._notifyChange();
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      _get(BrowserHistory.prototype.__proto__ || Object.getPrototypeOf(BrowserHistory.prototype), 'addChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 1) {
        if (window.addEventListener) {
          window.addEventListener('popstate', this.handlePopState, false);
        } else {
          window.attachEvent('onpopstate', this.handlePopState);
        }
      }
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      _get(BrowserHistory.prototype.__proto__ || Object.getPrototypeOf(BrowserHistory.prototype), 'removeChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 0) {
        if (window.removeEventListener) {
          window.removeEventListener('popstate', this.handlePopState, false);
        } else {
          window.detachEvent('onpopstate', this.handlePopState);
        }
      }
    }

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-pushstate

  }, {
    key: 'pushState',
    value: function pushState(state, path) {
      if (this.isSupported) {
        updateCurrentState(this.getScrollPosition());

        state = this._createState(state);

        window.history.pushState(state, '', path);
        this.location = this.createLocation(path, state, _NavigationTypes2.default.PUSH);
        this._notifyChange();
      } else {
        window.location = path;
      }
    }

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-replacestate

  }, {
    key: 'replaceState',
    value: function replaceState(state, path) {
      if (this.isSupported) {
        state = this._createState(state);

        window.history.replaceState(state, '', path);
        this.location = this.createLocation(path, state, _NavigationTypes2.default.REPLACE);
        this._notifyChange();
      } else {
        window.location.replace(path);
      }
    }
  }]);

  return BrowserHistory;
}(_DOMHistory3.default);

var history = exports.history = new BrowserHistory();
exports.default = BrowserHistory;