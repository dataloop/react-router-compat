'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _History2 = require('./History');

var _History3 = _interopRequireDefault(_History2);

var _DOMUtils = require('./DOMUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A history interface that assumes a DOM environment.
 */
var DOMHistory = function (_History) {
  _inherits(DOMHistory, _History);

  function DOMHistory() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DOMHistory);

    var _this = _possibleConstructorReturn(this, (DOMHistory.__proto__ || Object.getPrototypeOf(DOMHistory)).call(this, options));

    _this.getScrollPosition = options.getScrollPosition || _DOMUtils.getWindowScrollPosition;
    return _this;
  }

  _createClass(DOMHistory, [{
    key: 'go',
    value: function go(n) {
      if (n === 0) return;

      window.history.go(n);
    }
  }]);

  return DOMHistory;
}(_History3.default);

exports.default = DOMHistory;