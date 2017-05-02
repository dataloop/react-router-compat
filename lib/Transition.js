"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transition = function () {
  function Transition() {
    _classCallCheck(this, Transition);

    this.isCancelled = false;
    this.redirectInfo = null;
    this.abortReason = null;
  }

  _createClass(Transition, [{
    key: "to",
    value: function to(pathname, query, state) {
      this.redirectInfo = { pathname: pathname, query: query, state: state };
      this.isCancelled = true;
    }
  }, {
    key: "abort",
    value: function abort(reason) {
      this.abortReason = reason;
      this.isCancelled = true;
    }
  }]);

  return Transition;
}();

exports.default = Transition;