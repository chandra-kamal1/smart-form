"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _reactHookForm = require("react-hook-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = _ref => {
  let {
    nestIndex,
    control,
    register
  } = _ref;
  const {
    fields,
    remove,
    append
  } = (0, _reactHookForm.useFieldArray)({
    control,
    name: "test.".concat(nestIndex, ".nestedArray")
  });
  return /*#__PURE__*/_react.default.createElement("div", null, fields.map((item, k) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: item.id,
      style: {
        marginLeft: 20
      }
    }, /*#__PURE__*/_react.default.createElement("label", null, "Nested Array:"), /*#__PURE__*/_react.default.createElement("input", _extends({}, register("test.".concat(nestIndex, ".nestedArray.").concat(k, ".field1"), {
      required: true
    }), {
      defaultValue: item.field1,
      style: {
        marginRight: "25px"
      }
    })), /*#__PURE__*/_react.default.createElement("input", _extends({}, register("test.".concat(nestIndex, ".nestedArray.").concat(k, ".field2")), {
      defaultValue: item.field2
    })), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: () => remove(k)
    }, "Delete Nested"));
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: () => append({
      field1: "field1",
      field2: "field2"
    })
  }, "Append Nested"), /*#__PURE__*/_react.default.createElement("hr", null));
};

exports.default = _default;