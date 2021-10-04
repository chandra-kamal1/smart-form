"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TopWrapper = props => {
  if (props.type && props.type == 'table') {
    return /*#__PURE__*/_react.default.createElement(_Table.default, {
      stickyHeader: true,
      className: "min-w-xl",
      "aria-labelledby": "tableTitle"
    }, /*#__PURE__*/_react.default.createElement(_TableRow.default, {
      className: "h-48"
    }, /*#__PURE__*/_react.default.createElement(_TableBody.default, null, props.children)));
  } else if (props.type && props.type == 'flex') {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: '16px',
        marginTop: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }
    }, props.children);
  } else {
    return /*#__PURE__*/_react.default.createElement(_Grid.default, {
      container: true,
      spacing: props.spacing || 0,
      style: {
        marginBottom: '16px',
        marginTop: '16px'
      }
    }, props.children);
  }
};

var _default = TopWrapper;
exports.default = _default;