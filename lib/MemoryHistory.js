'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

var _History2 = require('./History');

var _History3 = _interopRequireDefault(_History2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createEntry(object) {
  if (typeof object === 'string') return { path: object };

  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object) return object;

  throw new Error('Unable to create history entry from ' + object);
}

/**
 * A concrete History class that doesn't require a DOM. Ideal
 * for testing because it allows you to specify route history
 * entries in the constructor.
 */

var MemoryHistory = function (_History) {
  _inherits(MemoryHistory, _History);

  function MemoryHistory(entries, current) {
    _classCallCheck(this, MemoryHistory);

    var _this = _possibleConstructorReturn(this, (MemoryHistory.__proto__ || Object.getPrototypeOf(MemoryHistory)).call(this));

    if (entries == null) {
      entries = ['/'];
    } else if (typeof entries === 'string') {
      entries = [entries];
    } else if (!Array.isArray(entries)) {
      throw new Error('MemoryHistory needs an array of entries');
    }

    entries = entries.map(createEntry);

    if (current == null) {
      current = entries.length - 1;
    } else {
      (0, _invariant2.default)(current >= 0 && current < entries.length, '%s current index must be >= 0 and < %s, was %s', _this.constructor.name, entries.length, current);
    }

    _this.entries = entries;
    _this.current = current;

    var currentEntry = entries[current];

    _this.location = _this.createLocation(currentEntry.path, currentEntry.state);
    return _this;
  }

  // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-pushstate


  _createClass(MemoryHistory, [{
    key: 'pushState',
    value: function pushState(state, path) {
      state = this._createState(state);

      this.current += 1;
      this.entries = this.entries.slice(0, this.current).concat([{ state: state, path: path }]);
      this.location = this.createLocation(path, state, _NavigationTypes2.default.PUSH);

      this._notifyChange();
    }

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-replacestate

  }, {
    key: 'replaceState',
    value: function replaceState(state, path) {
      state = this._createState(state);

      this.entries[this.current] = { state: state, path: path };
      this.location = this.createLocation(path, state, _NavigationTypes2.default.REPLACE);

      this._notifyChange();
    }
  }, {
    key: 'go',
    value: function go(n) {
      if (n === 0) return;

      (0, _invariant2.default)(this.canGo(n), '%s cannot go(%s) because there is not enough history', this.constructor.name, n);

      this.current += n;
      var currentEntry = this.entries[this.current];

      this.location = this.createLocation(currentEntry.path, currentEntry.state, _NavigationTypes2.default.POP);

      this._notifyChange();
    }
  }, {
    key: 'canGo',
    value: function canGo(n) {
      var index = this.current + n;
      return index >= 0 && index < this.entries.length;
    }
  }, {
    key: 'canGoBack',
    value: function canGoBack() {
      return this.canGo(-1);
    }
  }, {
    key: 'canGoForward',
    value: function canGoForward() {
      return this.canGo(1);
    }
  }]);

  return MemoryHistory;
}(_History3.default);

exports.default = MemoryHistory;