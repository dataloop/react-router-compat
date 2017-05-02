'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReactChildren = isReactChildren;
exports.createRouteFromReactElement = createRouteFromReactElement;
exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
exports.createRoutes = createRoutes;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidChild(object) {
  return object == null || (0, _react.isValidElement)(object);
}

function isReactChildren(object) {
  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
}

function createRouteFromReactElement(element) {
  var type = element.type;
  var route = Object.assign({}, type.defaultProps, element.props);

  if (route.children) {
    route.childRoutes = createRoutesFromReactChildren(route.children);
    delete route.children;
  }

  return route;
}

/**
 * Creates and returns a routes object from the given ReactChildren. JSX
 * provides a convenient way to visualize how routes in the hierarchy are
 * nested.
 *
 *   import { Route, createRoutesFromReactChildren } from 'react-router';
 *   
 *   var routes = createRoutesFromReactChildren(
 *     <Route component={App}>
 *       <Route path="home" component={Dashboard}/>
 *       <Route path="news" component={NewsFeed}/>
 *     </Route>
 *   );
 *
 * Note: This method is automatically used when you provide <Route> children
 * to a <Router> component.
 */
function createRoutesFromReactChildren(children) {
  var routes = [];

  _react.Children.forEach(children, function (element) {
    if ((0, _react.isValidElement)(element)) {
      // Component classes may have a static create* method.
      if (element.type.createRouteFromReactElement) {
        routes.push(element.type.createRouteFromReactElement(element));
      } else {
        routes.push(createRouteFromReactElement(element));
      }
    }
  });

  return routes;
}

/**
 * Creates and returns an array of routes from the given object which
 * may be a JSX route, a plain object route, or an array of either.
 */
function createRoutes(routes) {
  if (isReactChildren(routes)) {
    routes = createRoutesFromReactChildren(routes);
  } else if (!Array.isArray(routes)) {
    routes = [routes];
  }

  return routes;
}