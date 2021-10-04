"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TableField;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TableFooter = _interopRequireDefault(require("@material-ui/core/TableFooter"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _FirstPage = _interopRequireDefault(require("@material-ui/icons/FirstPage"));

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowRight"));

var _LastPage = _interopRequireDefault(require("@material-ui/icons/LastPage"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Attachment = _interopRequireDefault(require("@material-ui/icons/Attachment"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Attachment2 = _interopRequireDefault(require("../Attachment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStyles1 = (0, _styles.makeStyles)(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = (0, _styles.useTheme)();
  const {
    count,
    page,
    rowsPerPage,
    onChangePage
  } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: handleFirstPageButtonClick,
    disabled: page === 0,
    "aria-label": "first page"
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_LastPage.default, null) : /*#__PURE__*/_react.default.createElement(_FirstPage.default, null)), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: handleBackButtonClick,
    disabled: page === 0,
    "aria-label": "previous page"
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_KeyboardArrowRight.default, null) : /*#__PURE__*/_react.default.createElement(_KeyboardArrowLeft.default, null)), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: handleNextButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": "next page"
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_KeyboardArrowLeft.default, null) : /*#__PURE__*/_react.default.createElement(_KeyboardArrowRight.default, null)), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: handleLastPageButtonClick,
    disabled: page >= Math.ceil(count / rowsPerPage) - 1,
    "aria-label": "last page"
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_FirstPage.default, null) : /*#__PURE__*/_react.default.createElement(_LastPage.default, null)));
}

TablePaginationActions.propTypes = {
  count: _propTypes.default.number.isRequired,
  onChangePage: _propTypes.default.func.isRequired,
  page: _propTypes.default.number.isRequired,
  rowsPerPage: _propTypes.default.number.isRequired
};

function createData(name, calories, fat) {
  return {
    name,
    calories,
    fat
  };
}

const useStyles2 = (0, _styles.makeStyles)({
  table: {
    minWidth: 500
  }
});

function TableField(_ref) {
  let {
    columns,
    rows
  } = _ref;
  const classes = useStyles2();

  const [page, setPage] = _react.default.useState(0);

  const [rowsPerPage, setRowsPerPage] = _react.default.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows && rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const attachment = atms => {
    let ats = [];
    atms.forEach(element => {
      ats.push( /*#__PURE__*/_react.default.createElement(_Attachment2.default, {
        src: element,
        style: {
          float: 'left',
          marginRight: '5px'
        }
      }));
    });
    return ats;
  };

  return /*#__PURE__*/_react.default.createElement(_TableContainer.default, {
    component: _Paper.default
  }, /*#__PURE__*/_react.default.createElement(_Table.default, {
    className: classes.table,
    "aria-label": "custom pagination table"
  }, columns && columns.titles && /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    className: "h-64"
  }, columns.titles.map((column, i) => {
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      className: "p-4 md:p-16",
      key: i,
      align: "left",
      padding: "none"
    }, column);
  }, this))), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, rows && rows.map(row => /*#__PURE__*/_react.default.createElement(_TableRow.default, {
    key: row.name
  }, columns && columns.ids.map((clm, index) => /*#__PURE__*/_react.default.createElement(_TableCell.default, {
    component: "th",
    scope: "row"
  }, console.log("clm Attachment", clm), console.log("Row", row), clm == 'attList' && row[clm] != null && row[clm] != "" ? // <Tooltip title={decodeURI(row[clm].toString().split("/")[row[clm].toString().split("/").length-1])}>
  // <Link alt="kamal" href={row[clm]} target="_blank" download style={{backgroundColor: '#00000000', marginLeft: '10px'}}>
  //   <AttachmentIcon />
  // </Link>
  // </Tooltip>
  attachment(row[clm]) : (clm == 'attachmentId' || clm.indexOf('Attachment') >= 0) && row[clm] != null && row[clm] != "" ? attachment([row[clm]]) : row[clm] != null && row[clm] != "" ? row[clm] : "-")))))));
}