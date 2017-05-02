'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redirect = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _URLUtils = require('./URLUtils');

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    string = _React$PropTypes.string,
    object = _React$PropTypes.object;
var Redirect = exports.Redirect = _react2.default.createClass({
  displayName: 'Redirect',


  statics: {
    createRouteFromReactElement: function createRouteFromReactElement(element) {
      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

      if (route.from) route.path = route.from;

      route.onEnter = function (nextState, transition) {
        var location = nextState.location,
            params = nextState.params;

        var pathname = route.to ? (0, _URLUtils.formatPattern)(route.to, params) : location.pathname;

        transition.to(pathname, route.query || location.query, route.state || location.state);
      };

      return route;
    }
  },

  propTypes: {
    path: string,
    from: string, // Alias for path
    to: string.isRequired,
    query: object,
    state: object,
    onEnter: _PropTypes.falsy,
    children: _PropTypes.falsy
  },

  render: function render() {
    (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered');
  }
});

exports.default = Redirect;