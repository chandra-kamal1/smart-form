"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Section;

var _react = _interopRequireDefault(require("react"));

var _Fields = _interopRequireDefault(require("./Fields"));

var _TopWrapper = _interopRequireDefault(require("./TopWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Section(props) {
  return /*#__PURE__*/_react.default.createElement(_TopWrapper.default, {
    type: layout && layout.type,
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_Fields.default, props));
}