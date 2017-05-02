'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var object = _propTypes2.default.object,
    string = _propTypes2.default.string,
    func = _propTypes2.default.func;


function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <Link> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 *
 * Links may pass along query string parameters
 * using the `query` prop.
 *
 *   <Link to="/posts/123" query={{ show:true }}/>
 */
var Link = (0, _createReactClass2.default)({

  contextTypes: {
    router: object
  },

  propTypes: {
    activeStyle: object,
    activeClassName: string,
    to: string.isRequired,
    query: object,
    state: object,
    onClick: func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      activeClassName: 'active',
      style: {}
    };
  },
  handleClick: function handleClick(event) {
    var allowTransition = true;
    var clickResult;

    if (this.props.onClick) clickResult = this.props.onClick(event);

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

    if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

    event.preventDefault();

    if (allowTransition) this.context.router.transitionTo(this.props.to, this.props.query, this.props.state);
  },
  render: function render() {
    var router = this.context.router;


    var props = Object.assign({}, this.props, {
      href: router.makeHref(this.props.to, this.props.query),
      onClick: this.handleClick
    });

    // ignore if rendered outside of the context of a router, simplifies unit testing
    if (router && router.isActive(this.props.to, this.props.query)) {
      if (props.activeClassName) props.className += props.className !== '' ? ' ' + props.activeClassName : props.activeClassName;

      if (props.activeStyle) props.style = Object.assign({}, props.style, props.activeStyle);
    }

    var to = props.to,
        query = props.query,
        activeClassName = props.activeClassName,
        others = _objectWithoutProperties(props, ['to', 'query', 'activeClassName']);

    return _react2.default.createElement('a', others);
  }
});

exports.Link = Link;
exports.default = Link;