"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * You can extend Lodash with mixins
 * And use it as below
 * import _ from '@lodash'
 */
const _ = _lodash.default.runInContext();

_.mixin({
  // Immutable Set for setting state
  setIn: (state, name, value) => {
    return _.setWith(_.clone(state), name, value, _.clone);
  }
});

var _default = _;
exports.default = _default;