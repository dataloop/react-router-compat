'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

var _History = require('./History');

var _History2 = _interopRequireDefault(_History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _propTypes2.default.func,
    object = _propTypes2.default.object,
    arrayOf = _propTypes2.default.arrayOf,
    instanceOf = _propTypes2.default.instanceOf,
    oneOfType = _propTypes2.default.oneOfType,
    element = _propTypes2.default.element;


function falsy(props, propName, componentName) {
  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
}

var component = func;
var components = oneOfType([component, object]);
var history = instanceOf(_History2.default);
var location = instanceOf(_Location2.default);
var route = oneOfType([object, element]);
var routes = oneOfType([route, arrayOf(route)]);

module.exports = {
  falsy: falsy,
  component: component,
  components: components,
  history: history,
  location: location,
  route: route,
  routes: routes
};