"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _CardActionArea = _interopRequireDefault(require("@material-ui/core/CardActionArea"));

var _CardActions = _interopRequireDefault(require("@material-ui/core/CardActions"));

var _CardContent = _interopRequireDefault(require("@material-ui/core/CardContent"));

var _CardMedia = _interopRequireDefault(require("@material-ui/core/CardMedia"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _BrokenImage = _interopRequireDefault(require("@material-ui/icons/BrokenImage"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _lodash = _interopRequireDefault(require("../lodash"));

var _download = _interopRequireDefault(require("./download"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getFileName(url) {
  let filename = url.substring(url.lastIndexOf('/') + 1);

  if (!(filename.indexOf('.') == -1)) {
    return {
      name: filename.split('.')[0],
      type: filename.split('.')[1]
    };
  } else {
    return null;
  }
}

const useStyles = (0, _styles.makeStyles)(theme => ({
  link: {
    border: 0,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    borderRadius: '6px',
    height: '30px',
    padding: '0 10px',
    fontSize: '12px'
  }
}));

function Attachment(_ref) {
  let {
    src,
    width,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    image,
    title,
    style,
    className
  } = _ref;
  const classes = useStyles();
  const [error, setError] = (0, _react.useState)(false);
  const [filename, setFileName] = (0, _react.useState)(getFileName(src));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-left",
    style: _objectSpread({
      width,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth
    }, style)
  }, filename && /*#__PURE__*/_react.default.createElement("button", {
    className: classes.link,
    onClick: e => (0, _download.default)(src)
  }, filename.name.replace(/%20/g, " ")));
}

var _default = Attachment;
exports.default = _default;