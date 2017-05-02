'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

var _History = require('./History');

var _History2 = _interopRequireDefault(_History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _React$PropTypes = _react2.default.PropTypes,
    func = _React$PropTypes.func,
    object = _React$PropTypes.object,
    arrayOf = _React$PropTypes.arrayOf,
    instanceOf = _React$PropTypes.instanceOf,
    oneOfType = _React$PropTypes.oneOfType,
    element = _React$PropTypes.element;


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