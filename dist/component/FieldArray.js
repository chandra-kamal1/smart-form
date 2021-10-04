"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FieldArray;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _HighlightOff = _interopRequireDefault(require("@material-ui/icons/HighlightOff"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _reactHookForm = require("react-hook-form");

var _Fields = _interopRequireDefault(require("./Fields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let renderCount = 0;

function FieldArray(_ref) {
  let {
    path,
    name,
    watch,
    control,
    register,
    setError,
    clearErrors,
    setValue,
    getValues,
    subFields,
    disabled,
    defaultValues,
    errors,
    layout,
    onChange,
    onBlur,
    arrLayout,
    columns
  } = _ref;
  const {
    fields,
    append,
    remove,
    insert,
    prepend
  } = (0, _reactHookForm.useFieldArray)({
    control,
    name: path
  });
  renderCount++;

  const xsv = column => {
    return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 6 ? 2 : 12;
  };

  const spacing = space => {
    return space || 2;
  };

  const size = sz => {
    return sz || '';
  };

  (0, _react.useEffect)(() => {
    if (!fields.length || fields.length < 1) {
      append();
    }
  }, [fields]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 12,
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    type: "button",
    onClick: () => {
      append();
    },
    variant: "contained",
    color: "primary",
    size: "small"
  }, "add more")), /*#__PURE__*/_react.default.createElement(_Table.default, {
    stickyHeader: true,
    className: "min-w-xl",
    "aria-labelledby": "tableTitle"
  }, columns && columns && /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    className: "h-64"
  }, columns && columns.map((row, i) => {
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      className: "p-4 md:p-16 height",
      key: i,
      align: "center",
      padding: 'none'
    }, row);
  }, this), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    className: "p-4 md:p-16",
    align: "center",
    padding: 'none'
  }, "Action"))), fields.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(_Fields.default, {
      path: "".concat(path, ".").concat(index),
      register,
      errors,
      watch,
      control,
      setError,
      clearErrors,
      setValue,
      onChange,
      onBlur,
      getValues,
      disabled,
      defaultValues,
      fields: subFields,
      layout: {
        xsv: xsv(arrLayout && arrLayout.column),
        spacing: spacing(arrLayout && arrLayout.spacing),
        size: size(arrLayout && arrLayout.size),
        label: arrLayout && arrLayout.label,
        type: arrLayout && arrLayout.type
      },
      onChange: data => console.log(data)
    }), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      className: "p-4 md:p-16",
      align: "center",
      padding: 'none'
    }, index > 0 && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
      color: "primary",
      "aria-label": "upload picture",
      component: "span",
      size: "small",
      onClick: () => remove(index)
    }, /*#__PURE__*/_react.default.createElement(_HighlightOff.default, null))));
  })));
}