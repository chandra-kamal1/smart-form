"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FieldWrapper = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Radio = _interopRequireDefault(require("@material-ui/core/Radio"));

var _RadioGroup = _interopRequireDefault(require("@material-ui/core/RadioGroup"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _FormHelperText = _interopRequireDefault(require("@material-ui/core/FormHelperText"));

var _Link = _interopRequireDefault(require("@material-ui/core/Link"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Attachment = _interopRequireDefault(require("@material-ui/icons/Attachment"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Cancel = _interopRequireDefault(require("@material-ui/icons/Cancel"));

var _reactHookForm = require("react-hook-form");

var _FieldArray = _interopRequireDefault(require("./FieldArray"));

var _TopWrapper = _interopRequireDefault(require("./TopWrapper"));

var _CloudUpload = _interopRequireDefault(require("@material-ui/icons/CloudUpload"));

var _Table = _interopRequireDefault(require("./Table"));

var _lodash = _interopRequireDefault(require("../lodash"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _reactCkeditorComponent = _interopRequireDefault(require("react-ckeditor-component"));

var _matchSorter = require("match-sorter");

var _Autocomplete = _interopRequireWildcard(require("@material-ui/lab/Autocomplete"));

var _serviceWorker = require("../serviceWorker");

var _Attachment2 = _interopRequireDefault(require("../Attachment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

const FieldWrapper = _ref => {
  let {
    type,
    content,
    attr
  } = _ref;

  if (type && type == 'table') {
    return /*#__PURE__*/_react.default.createElement(_TableCell.default, {
      className: "p-4",
      component: "th",
      scope: "row",
      style: {
        verticalAlign: 'top'
      }
    }, content);
  } else if (type && type == 'flex') {
    return /*#__PURE__*/_react.default.createElement("div", attr, content);
  } else {
    return /*#__PURE__*/_react.default.createElement(_Grid.default, _extends({
      item: true
    }, attr), content);
  }
};

exports.FieldWrapper = FieldWrapper;

function todayDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

const today = new Date();
const useStyles = (0, _core.makeStyles)(theme => ({
  cell: {
    align: 'center',
    padding: 8
  },
  rootFirstSelect: {
    padding: '14px'
  },
  rootSecondSelect: {
    padding: '10px 80px'
  },
  label: {
    display: 'inline-block',
    marginBottom: '8px'
  },
  formTitle: {
    background: '#ff000000',
    color: '#000',
    textAlign: 'left',
    padding: '8px 0px',
    borderRadius: '5px',
    marginBottom: '16px',
    fontSize: '24px',
    fontWeight: '600'
  },
  sectionTitle: {
    background: '#ff0000',
    color: '#fff',
    textAlign: 'center',
    padding: '8px 14px',
    borderRadius: '5px',
    marginBottom: '16px',
    fontSize: '20px',
    fontWeight: '600'
  },
  button: {
    margin: 5
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  attachFile: {
    border: '1px solid #c4c4c4',
    borderRadius: '4px',
    '& label': {
      width: '100%',
      padding: '18px 14px',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    '& img': {
      display: 'inline-block',
      marginRight: '10px'
    },
    '&:hover': {
      border: '1px solid #767676'
    }
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, multiselect, theme) {
  return {
    fontWeight: multiselect.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

function validator(v1, sm1, v2) {
  if (sm1 == ">") {
    return v1 > v2;
  } else if (sm1 == "<") {
    return v1 < v2;
  } else if (sm1 == "==") {
    return v1 == v2;
  } else if (sm1 == "===") {
    return v1 === v2;
  } else if (sm1 == "!=") {
    return v1 != v2;
  } else if (sm1 == "!==") {
    return v1 !== v2;
  } else if (sm1 == "<=") {
    return v1 <= v2;
  } else if (sm1 == ">=") {
    return v1 >= v2;
  }
}

function Fields(_ref2) {
  let {
    register,
    errors,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
    onChange,
    onBlur: _onBlur,
    disabled,
    defaultValues,
    fields,
    layout,
    reset,
    path
  } = _ref2;
  const classes = useStyles();
  const theme = (0, _core.useTheme)();
  const [values, setValues] = (0, _react.useState)({});
  const [multiSelect, setMultiSelect] = (0, _react.useState)([]);
  const [inputAutoValue, setInputAutoValue] = (0, _react.useState)(null);
  let {
    xsv,
    spacing,
    size
  } = layout;

  const fxsv = column => {
    return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 6 ? 2 : 12;
  };

  const fspacing = space => {
    return space || 2;
  };

  const fsize = sz => {
    return sz || "";
  };

  const handelChange = (name, value) => {
    let val = values;
    val = _objectSpread(_objectSpread({}, val), {}, {
      [name]: value
    });

    if (onChange) {
      onChange(val);
    }

    setValues(_objectSpread({}, val));
  };

  const handelSaveValue = (name, value) => {
    setValue(name, value);
  };

  const handelChangeCkEditor = (name, value) => {};

  const calculation = _ref3 => {
    let {
      field,
      name
    } = _ref3;

    let start = _lodash.default.some(field.calculation.from, _lodash.default.method('includes', '*'));

    let forThis = _lodash.default.some(field.calculation.from, _lodash.default.method('includes', 'this*'));

    let watchValues = [];
    let watchArrayValue = [];
    let onerowdata = {};
    let arrttname = name.split(/\.(?=[^\.]+$)/);
    field.calculation.from.forEach(val => {
      if (val.includes('*')) {
        if (val.includes('this*')) {
          onerowdata = watch(arrttname[0]);
          var flname = val.split('*')[1];
          watchValues.push(Number(onerowdata[flname]));
        } else {
          watchArrayValue = watch(val.split('*')[0]);
          watchArrayValue && watchArrayValue.forEach(av => {
            watchValues.push(Number(av[val.split('*')[1]]));
          });
        }
      } else {
        let wf = watch(val);
        watchValues.push(Number(wf));
      }
    });

    if (field.calculation.type == "add") {
      let calc = 0;

      if (watchValues.length) {
        watchValues.forEach(val => {
          if (val) {
            calc += val;
          }
        });
      }

      if (watch(name) !== calc) {
        setValue(name, calc);
      }

      return calc || 0;
    } else if (field.calculation.type == "multiplication") {
      let calc = 1;

      if (watchValues.length) {
        watchValues.forEach(val => {
          if (val) {
            calc *= val;
          }
        });
      }

      if (watch(name) !== calc) {
        setValue(name, calc);
      }

      return calc || 0;
    } else if (field.calculation.type == "division") {
      let calc = 0;

      if (watchValues.length) {
        watchValues.forEach(val => {
          if (val) {
            calc /= val;
          }
        });
      }

      if (watch(name) !== calc) {
        setValue(name, calc);
      }

      return calc || 0;
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, fields.map(field => {
    let preValue = {};
    let {
      title,
      type,
      name,
      validationProps,
      dynamic,
      options,
      defaultValue,
      min,
      max,
      maxlength,
      minlength,
      bind,
      widget,
      multiple,
      accept,
      maxSize,
      subFields,
      fileName,
      pattern,
      style
    } = field;
    let disableField = {};

    if (field && field.disabled == false) {
      disableField = {};
    } else if (field && field.disabled == true) {
      disableField = {
        disabled: 'disabled'
      };
    } else if (disabled) {
      disableField = {
        disabled: 'disabled'
      };
    }

    if (field && field.type !== 'section' && field.layout && field.layout.column) {
      xsv = field.layout.column == 1 ? 12 : field.layout.column == 2 ? 6 : field.layout.column == 3 ? 4 : 12;
    }

    let maxDate = {},
        minDate = {};

    if (field && field.type == "date") {
      if (field && field.min == "today") {
        minDate = {
          inputProps: {
            min: todayDate()
          }
        };
      } else if (field && field.max == "today") {
        minDate = {
          inputProps: {
            max: todayDate()
          }
        };
      }

      if (field && field.min && field.min !== "today") {
        minDate = {
          inputProps: {
            min: todayDate()
          }
        };
      } else if (field && field.max == "today") {
        minDate = {
          inputProps: {
            max: todayDate()
          }
        };
      }
    }

    if (defaultValues) {
      preValue = {
        defaultValue: defaultValues[name] || defaultValue
      };

      if (type == "multiSelect" && _lodash.default.isArray(preValue.defaultValue) == false) {
        if (preValue.defaultValue) {
          preValue.defaultValue = preValue.defaultValue.split(',');
        }
      }
    }

    let sectionProps = {
      register,
      errors,
      watch,
      control,
      setValue,
      setError,
      clearErrors,
      getValues,
      disabled,
      onChange,
      onBlur: fldname => _onBlur(fldname),
      reset,
      defaultValues,
      fields: field.fields,
      layout: {
        xsv: fxsv(field.layout && field.layout.column || layout && layout.column),
        spacing: fspacing(field.layout && field.layout.spacing || layout && layout.spacing),
        size: fsize(field.layout && field.layout.size || layout && layout.size),
        label: field.layout && field.layout.label || layout && layout.label,
        type: field.layout && field.layout.type || layout && layout.type
      }
    };
    let registerName = name;

    if (path) {
      registerName = "".concat(path, ".").concat(name);
      preValue = {
        defaultValue: _lodash.default.get(defaultValues, registerName)
      };
      sectionProps = _objectSpread(_objectSpread({}, sectionProps), {}, {
        path: path
      });
    }

    if (type == "multiSelect" && preValue && preValue.defaultValue && preValue.defaultValue.length && multiSelect.length == 0) {
      setMultiSelect(_objectSpread(_objectSpread({}, multiSelect), {}, {
        [registerName]: preValue.defaultValue
      }));
    }

    if (type == "autocomplete" && preValue && preValue.defaultValue && !inputAutoValue) {
      const res = options.filter(ele => {
        return ele.value == preValue.defaultValue;
      });
      preValue.defaultValue = res[0];
    }

    if (bind) {
      if (bind && bind.field && bind.field.indexOf('*') == -1) {} else {
        let dName = bind && "".concat(path, ".").concat(bind['field'].split('*')[1]);

        if (bind.data[watch(dName)] && watch(registerName) !== bind.data[watch(dName)]) {
          setValue(registerName, bind.data[watch(dName)] || 0);
        }

        preValue = {
          defaultValue: bind.data[watch(dName)] || 0
        };
      }
    }

    let filterOptions = (options, _ref4) => {
      let {
        inputValue
      } = _ref4;
      return (0, _matchSorter.matchSorter)(options, inputValue, {
        keys: ['value', 'title']
      });
    };

    let validateObj = {};

    if (!_lodash.default.isEmpty(validationProps)) {
      let enableValidation = true;

      if (validationProps.validateRow && validationProps.validateRow.length) {
        let tempchaker = false;
        validationProps.validateRow.forEach(fldname => {
          if (watch(path + '.' + fldname)) {
            tempchaker = true;
          }
        });

        if (!tempchaker) {
          enableValidation = false;
        }
      }

      if (validationProps.enable) {
        let cs = validationProps.enable.split(" ");

        if (validationProps.enable.indexOf('"') > -1) {
          var sp1 = validationProps.enable.split('"');
          cs = sp1[0].trim().split(' ');
          cs.push(sp1[1]);
        }

        cs.forEach((element, i) => {
          if (!(element && element.indexOf('*') == -1)) {
            cs[i] = "".concat(path, ".").concat(element.split('*')[1]);
          }
        });
        let checker = validator(watch(cs[0]), cs[1], cs[2]);
        enableValidation = checker;

        if (!checker) {
          validateObj = {
            required: false,
            validate: false,
            manual: false
          };
        }

        if (!checker && _lodash.default.get(errors, registerName)) {// clearErrors(registerName);
        }
      }

      if (enableValidation) {
        for (const vp in validationProps) {
          if (vp == "required") {
            validateObj = _objectSpread(_objectSpread({}, validateObj), {}, {
              required: validationProps[vp]
            });
          } else if (vp == "validate" && validationProps[vp].length) {
            validationProps[vp].forEach((vld, i) => {
              let cs = vld.condition.split(" ");
              cs.forEach((element, i) => {
                if (!(element && element.indexOf('*') == -1)) {
                  cs[i] = "".concat(path, ".").concat(element.split('*')[1]);
                }
              });
              let checker = validator(watch(cs[0]), cs[1], watch(cs[2]));

              if (type == "date") {
                checker = validator(new Date(watch(cs[0])), cs[1], new Date(watch(cs[2])));
              }

              if (checker && _lodash.default.get(errors, registerName)) {// clearErrors(registerName);
              }

              if (validateObj.validate) {
                validateObj = _objectSpread(_objectSpread({}, validateObj), {}, {
                  validate: _objectSpread(_objectSpread({}, validateObj.validate), {}, {
                    ["validate" + i]: value => checker || vld.message
                  })
                });
              } else {
                validateObj = _objectSpread(_objectSpread({}, validateObj), {}, {
                  validate: {
                    ["validate" + i]: value => checker || vld.message
                  }
                });
              }
            });
          } else if (vp == "manual" && validationProps[vp].length) {
            validationProps[vp].forEach((vld, i) => {
              let cs = vld.condition.split(" ");
              cs.forEach((element, i) => {
                if (!(element && element.indexOf('*') == -1)) {
                  cs[i] = "".concat(path, ".").concat(element.split('*')[1]);
                }
              });
              let checker = validator(watch(cs[0]), cs[1], Number(cs[2]) || cs[2]);

              if (type == "date") {
                if (cs[2] == "today") {
                  checker = validator(new Date(watch(cs[0])), cs[1], new Date(todayDate()));
                } else {
                  checker = validator(new Date(watch(cs[0])), cs[1], new Date(watch(cs[2])));
                }
              }

              if (validateObj.validate) {
                validateObj = _objectSpread(_objectSpread({}, validateObj), {}, {
                  validate: _objectSpread(_objectSpread({}, validateObj.validate), {}, {
                    ["validateManual" + i]: value => checker || vld.message
                  })
                });
              } else {
                validateObj = _objectSpread(_objectSpread({}, validateObj), {}, {
                  validate: {
                    ["validateManual" + i]: value => checker || vld.message
                  }
                });
              }
            });
          } else if (vp == "maxLength" && Object.keys(disableField).length === 0) {
            console.log("registerName", registerName);
            let ml = watch(registerName);

            if (ml && ml.length > validationProps[vp].value && !_lodash.default.get(errors, registerName)) {
              setError(registerName, {
                type: "maxLength",
                message: validationProps[vp].message
              });
            } else if (ml && ml.length <= validationProps[vp].value && _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'maxLength') {
              clearErrors(registerName);
            }
          } else if (vp == "minLength") {
            let ml = watch(registerName);

            if (ml && ml.length < validationProps[vp].value && !_lodash.default.get(errors, registerName)) {
              setError(registerName, {
                type: "minLength",
                message: validationProps[vp].message
              });
            } else if (ml && ml.length >= validationProps[vp].value && _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'minLength') {
              clearErrors(registerName);
            }
          } else if (vp == "max") {
            let ml = watch(registerName);

            if (ml > validationProps[vp].value && !_lodash.default.get(errors, registerName)) {
              setError(registerName, {
                type: "max",
                message: validationProps[vp].message
              });
            } else if (ml <= validationProps[vp].value && _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'max') {
              clearErrors(registerName);
            }
          } else if (vp == "min") {
            let ml = watch(registerName);

            if (ml < validationProps[vp].value && !_lodash.default.get(errors, registerName)) {
              setError(registerName, {
                type: "min",
                message: validationProps[vp].message
              });
            } else if (ml >= validationProps[vp].value && _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'min') {
              clearErrors(registerName);
            }
          } else if (vp == "size" && type == "file") {
            let filesize = watch(registerName) && watch(registerName)[0] && watch(registerName)[0].size || 0;
            let fsz = filesize / 1024;

            if (fsz > validationProps[vp].value * 1024 && !_lodash.default.get(errors, registerName)) {
              setError(registerName, {
                type: "size",
                message: validationProps[vp].message
              });
            } else if (fsz <= validationProps[vp].value * 1024 && _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'size') {
              clearErrors(registerName);
            }
          } else if (vp == "pattern") {
            validateObj = _objectSpread(_objectSpread({}, validateObj), {}, {
              pattern: {
                value: validationProps[vp].value,
                message: validationProps[vp].message
              }
            });
          }
        }
      }
    }

    let showField = true;

    if (dynamic) {
      (0, _serviceWorker.unregister)(dynamic.field);

      if (dynamic && dynamic.field && dynamic.field.indexOf('*') == -1) {
        const wv = _lodash.default.isObject(watch(dynamic['field'])) ? watch(dynamic['field']).value : watch(dynamic['field']);

        if (dynamic && dynamic.value) {
          showField = dynamic ? wv && dynamic['value'].includes(wv) : true;

          if (dynamic.value.includes("undefind") && !showField) {
            showField = wv ? false : true;
          }
        } else if (dynamic && dynamic.isNotValue) {
          showField = dynamic ? wv && !dynamic['isNotValue'].includes(wv) : true;
        }
      } else {
        let dName = dynamic && "".concat(path, ".").concat(dynamic['field'].split('*')[1]);
        const wv = _lodash.default.isObject(watch(dName)) ? watch(dName).value : watch(dName);

        if (dynamic && dynamic.value) {
          showField = dynamic ? wv && dynamic['value'].includes(wv) : true;

          if (dynamic.value.includes("undefind") && !showField) {
            showField = wv ? false : true;
          }
        } else if (dynamic && dynamic.isNotValue) {
          showField = dynamic ? wv && !dynamic['isNotValue'].includes(wv) : true;
        }
      }
    }

    if (!showField) return null;

    switch (type) {
      case 'blank':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: {
              style
            }
          },
          content: /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name
          }, register(registerName, _objectSpread({}, validateObj)), {
            disabled: true,
            variant: "outlined",
            fullWidth: true,
            size: size,
            inputProps: {
              maxlength: maxlength,
              minlength: minlength
            },
            style: {
              opacity: 0
            }
          }))
        });

      case 'hidden':
        return /*#__PURE__*/_react.default.createElement("imput", _extends({
          type: "hidden"
        }, register(registerName, _objectSpread({}, validateObj)), preValue));

      case 'text':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''
          }, register(registerName, _objectSpread(_objectSpread({}, validateObj), {}, {
            pattern
          })), preValue, {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);
            },
            onBlur: () => _onBlur(registerName)
          }, disableField, {
            variant: "outlined",
            fullWidth: true,
            size: size,
            inputProps: {
              maxlength: maxlength,
              minlength: minlength
            },
            error: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? true : false,
            helperText: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? _lodash.default.get(errors, registerName).message : ''
          })))
        });

      case 'number':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: registerName,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : '',
            type: "number"
          }, register(registerName, validateObj), preValue, {
            value: field && field.calculation ? calculation({
              field,
              name: registerName
            }) : register(registerName).value,
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);

              if (e.target.value == 0) {
                setError(name, {
                  type: 'manual',
                  message: 'Should not be empty or 0.'
                });
              } else if (e.target.value == null || e.target.value > 0) {
                if (errors && _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName)['type'] === 'manual') {
                  clearErrors(name);
                }
              }
            },
            onBlur: () => _onBlur(registerName)
          }, disableField, {
            variant: "outlined",
            fullWidth: true,
            size: size,
            inputProps: {
              maxlength: maxlength,
              minlength: minlength,
              max: max,
              min: min,
              readOnly: field && field.calculation ? true : false
            },
            error: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? true : false,
            helperText: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? _lodash.default.get(errors, registerName).message : ''
          })))
        });

      case 'email':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : '',
            type: "email"
          }, register(registerName, validateObj), preValue, {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);
            },
            onBlur: () => _onBlur(registerName)
          }, disableField, {
            variant: "outlined",
            fullWidth: true,
            size: size,
            error: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? true : false,
            helperText: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? _lodash.default.get(errors, registerName).message : ''
          })))
        });

      case 'tel':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : '',
            type: "tel"
          }, register(registerName, validateObj), preValue, {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);
            },
            onBlur: () => _onBlur(registerName)
          }, disableField, {
            variant: "outlined",
            inputProps: {
              maxlength: maxlength,
              minlength: minlength,
              min: min,
              max: max
            },
            fullWidth: true,
            size: size,
            error: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? true : false,
            helperText: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? _lodash.default.get(errors, registerName).message : ''
          })))
        });

      case 'textarea':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : '',
            multiline: true,
            rows: 4
          }, register(registerName, _objectSpread(_objectSpread({}, validateObj), {}, {
            pattern
          })), preValue, {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);
            },
            onBlur: () => _onBlur(registerName)
          }, disableField, {
            variant: "outlined",
            fullWidth: true,
            size: size,
            inputProps: {
              maxlength: maxlength,
              minlength: minlength
            },
            error: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? true : false,
            helperText: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? _lodash.default.get(errors, registerName).message : ''
          })))
        });

      case 'checkbox':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
            component: "fieldset",
            error: _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' ? true : false,
            size: size,
            style: {
              flexDirection: 'row'
            }
          }, /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            style: {
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px'
            }
          }, title, " :", ' '), /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, _extends({}, register(registerName, validateObj), {
            control: control,
            render: _ref5 => {
              let {
                field
              } = _ref5;
              return /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, _extends({}, field, {
                onChange: e => {
                  field.onChange(e);
                  handelChange(name, e.target.checked);
                  handelSaveValue(name, e.target.checked);

                  _onBlur(registerName);
                }
              }, disableField, {
                control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
                  defaultChecked: preValue.defaultValue,
                  id: name,
                  color: "primary"
                })
              }));
            }
          })), _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          }, _lodash.default.get(errors, registerName).message)))
        });

      case 'radio':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
            component: "fieldset",
            error: _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' ? true : false,
            size: size
          }, /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          }, title, " :", ' '), /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, _extends({}, register(registerName, validateObj), {
            control: control,
            render: _ref6 => {
              let {
                field
              } = _ref6;
              return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_RadioGroup.default, _extends({}, field, {
                onChange: e => {
                  field.onChange(e);
                  handelChange(name, e.target.value);
                  handelSaveValue(name, e.target.value);

                  _onBlur(registerName);
                },
                row: true,
                style: {
                  height: '62px'
                }
              }), options.map(radio => /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, _extends({
                value: radio.value
              }, disableField, preValue, {
                control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
                  size: size
                }),
                label: radio.title,
                labelPlacement: radio.labelPlacement || 'start'
              })))));
            }
          })), _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          }, _lodash.default.get(errors, registerName).message)))
        });

      case 'slider':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_FormControl.default, {
            component: "fieldset",
            error: _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' ? true : false,
            size: size,
            style: {
              width: '100%'
            }
          }, /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            style: {
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px'
            }
          }, title, ":"), /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, _extends({
            control: control
          }, preValue, register(registerName, validateObj), {
            render: _ref7 => {
              let {
                field: {
                  onChange: _onChange
                }
              } = _ref7;
              return /*#__PURE__*/_react.default.createElement(_Slider.default, _extends({
                name: name,
                onChange: (_, value) => {
                  _onChange(value);

                  handelChange(name, value);
                  handelSaveValue(name, value);

                  _onBlur(registerName);
                }
              }, disableField, {
                valueLabelDisplay: "auto",
                defaultValue: preValue.defaultValue,
                max: 0,
                max: max,
                step: 1
              }));
            }
          })), _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          }, _lodash.default.get(errors, registerName).message)))
        });

      case 'date':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : '',
            type: "date"
          }, register(registerName, _objectSpread({}, validateObj)), {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);

              _onBlur(registerName);
            }
          }, disableField, {
            defaultValue: preValue.defaultValue && formatDate(preValue.defaultValue) // {...preValue}
            ,
            InputLabelProps: {
              shrink: true
            }
          }, minDate, maxDate, disableField, {
            variant: "outlined",
            fullWidth: true,
            size: size,
            error: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? true : false,
            helperText: _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') ? _lodash.default.get(errors, registerName).message : ''
          })))
        });

      case 'select':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && title && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
            error: _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' ? true : false,
            variant: "outlined",
            fullWidth: true,
            size: size
          }, layout.label !== 'fixed' && title && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
            id: name
          }, title), /*#__PURE__*/_react.default.createElement(_reactHookForm.Controller, _extends({
            render: _ref8 => {
              let {
                field
              } = _ref8;
              let properties = {};

              if (layout.label !== 'fixed') {
                properties = {
                  labelId: name,
                  label: title
                };
              }

              return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
                native: true,
                id: name
              }, properties, field, {
                onChange: e => {
                  field.onChange(e);
                  handelChange(name, e.target.value);
                  handelSaveValue(name, e.target.value);

                  _onBlur(registerName);
                }
              }, disableField), /*#__PURE__*/_react.default.createElement("option", {
                value: ""
              }), options && options.map(option => /*#__PURE__*/_react.default.createElement("option", {
                value: option.value
              }, option.title))));
            },
            control: control
          }, preValue, register(registerName, validateObj))), _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, null, _lodash.default.get(errors, registerName).message)))
        });

      case 'autocomplete':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && title && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_Autocomplete.default, _extends({
            id: name
          }, preValue, register(registerName, validateObj), {
            onChange: (e, data) => {
              register(registerName).onChange(e);
              handelChange(name, data);
              data && data.value && handelSaveValue(registerName, data.value);
            },
            onBlur: () => _onBlur(registerName),
            options: options,
            getOptionLabel: option => option.title,
            style: {
              width: '100%',
              minWidth: '135px'
            },
            fullWidth: true,
            size: size,
            renderInput: params => /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, params, {
              label: layout.label !== 'fixed' && title,
              variant: "outlined",
              size: size,
              style: {
                minWidth: '75px'
              }
            })),
            error: _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' ? true : false
          })), _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, null, _lodash.default.get(errors, registerName).message))
        });

      case 'multiSelect':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_FormControl.default, {
            error: _lodash.default.get(errors, registerName) && _lodash.default.get(errors, registerName).type === 'required' ? true : false,
            variant: "outlined",
            fullWidth: true,
            size: size
          }, layout.label !== 'fixed' && /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
            id: name
          }, title), /*#__PURE__*/_react.default.createElement(_Select.default, _extends({
            labelId: name,
            id: "demo-mutiple-chip",
            multiple: true
          }, preValue, register(registerName, validateObj), {
            value: multiSelect && multiSelect[registerName] ? multiSelect[registerName] : preValue && 'defaultValue' in preValue && _lodash.default.isArray(preValue.defaultValue) ? preValue.defaultValue : [],
            onChange: e => {
              setMultiSelect(_objectSpread(_objectSpread({}, multiSelect), {}, {
                [registerName]: e.target.value
              }));
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(registerName, e.target.value);
            },
            onBlur: () => _onBlur(registerName),
            input: /*#__PURE__*/_react.default.createElement(_Input.default, {
              id: "select-multiple-chip"
            }),
            renderValue: selected => /*#__PURE__*/_react.default.createElement("div", {
              className: classes.chips
            }, selected && selected.length && selected.map(value => value && Object.keys(disableField).length === 0 ? /*#__PURE__*/_react.default.createElement(_Chip.default, {
              key: value,
              label: options && options.filter(ch => ch.value == value)[0] && options.filter(ch => ch.value == value)[0].title ? options && options.filter(ch => ch.value == value)[0].title : null,
              clickable: true,
              deleteIcon: /*#__PURE__*/_react.default.createElement(_Cancel.default, {
                onMouseDown: event => event.stopPropagation()
              }),
              className: classes.chip,
              onDelete: e => {
                let ms = multiSelect && multiSelect[registerName];
                let index = ms.indexOf(value);

                if (index > -1) {
                  ms.splice(index, 1);
                }

                setMultiSelect(_objectSpread(_objectSpread({}, multiSelect), {}, {
                  [registerName]: ms
                }));
                handelChange(name, ms);
                handelSaveValue(name, ms);
              }
            }) : /*#__PURE__*/_react.default.createElement(_Chip.default, {
              key: value,
              label: options && options.filter(ch => ch.value == value)[0] && options.filter(ch => ch.value == value)[0].title ? options && options.filter(ch => ch.value == value)[0].title : null,
              clickable: true,
              className: classes.chip
            }))),
            MenuProps: MenuProps,
            variant: "outlined"
          }, disableField), /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
            value: ""
          }), options && options.length && options.map(option => /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
            key: option.value,
            value: option.value,
            style: getStyles(option.value, multiSelect[registerName] || [], theme)
          }, option.title))), _lodash.default.get(errors, registerName) && (_lodash.default.get(errors, registerName) || _lodash.default.get(errors, registerName).type === 'required' || _lodash.default.get(errors, registerName).type === 'manual') && /*#__PURE__*/_react.default.createElement(_FormHelperText.default, null, _lodash.default.get(errors, registerName).message)))
        });

      case 'url':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({
            id: name,
            label: layout.label !== 'fixed' && layout.label !== 'blank' ? title : '',
            type: "url"
          }, register(registerName, validateObj), preValue, {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.value);
              handelSaveValue(name, e.target.value);
            },
            onBlur: () => _onBlur(registerName)
          }, disableField, {
            variant: "outlined",
            fullWidth: true,
            size: size
          })), errors && _lodash.default.get(errors, registerName) && /*#__PURE__*/_react.default.createElement("span", {
            className: "red-text"
          }, _lodash.default.get(errors, registerName)['message']))
        });

      case 'ckeditor':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layout.label == 'fixed' && title && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title), /*#__PURE__*/_react.default.createElement(_reactCkeditorComponent.default, {
            config: {
              toolbar: [// { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
              // { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
              // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
              // { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
              '/', {
                name: 'basicstyles',
                groups: ['basicstyles', 'cleanup'],
                items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
              }, {
                name: 'paragraph',
                groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
                items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
              }, {
                name: 'links',
                items: ['Link', 'Unlink']
              }, {
                name: 'insert',
                items: ['Table', 'HorizontalRule', 'PageBreak']
              }, '/', {
                name: 'styles',
                items: ['Styles', 'Format', 'Font', 'FontSize']
              }, {
                name: 'colors',
                items: ['TextColor', 'BGColor']
              }, {
                name: 'tools',
                items: ['Maximize', 'ShowBlocks']
              } // { name: 'others', items: [ '-' ] },
              // { name: 'about', items: [ 'About' ] }
              ],
              readOnly: disabled
            },
            activeClass: "p10",
            content: watch(name),
            events: {
              change: e => {
                const data = e.editor.getData();

                if (data !== watch(name)) {
                  handelChangeCkEditor(name, data);
                  handelSaveValue(name, data);
                }
              },
              blur: () => _onBlur(registerName)
            }
          }), /*#__PURE__*/_react.default.createElement("input", _extends({}, preValue, register(registerName, validateObj), {
            value: preValue.defaultValue,
            type: "hidden"
          })), errors && _lodash.default.get(errors, registerName) && /*#__PURE__*/_react.default.createElement("span", {
            className: "red-text",
            style: {
              color: '#f44336'
            }
          }, _lodash.default.get(errors, registerName)['message']))
        });

      case 'file':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }
          }, /*#__PURE__*/_react.default.createElement("input", _extends({
            accept: accept,
            className: classes.input,
            style: {
              display: 'none'
            },
            id: registerName,
            multiple: multiple,
            type: "file"
          }, register(registerName, validateObj), {
            onChange: e => {
              register(registerName).onChange(e);
              handelChange(name, e.target.files[0]);

              _onBlur(registerName);
            }
          })), /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
            title: watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name || "Add File"
          }, /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: registerName
          }, /*#__PURE__*/_react.default.createElement("div", {
            color: watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name ? "secondry" : "primary",
            "aria-label": "upload picture",
            size: size,
            component: "span"
          }, /*#__PURE__*/_react.default.createElement(_Button.default, {
            variant: "contained",
            color: "default",
            startIcon: /*#__PURE__*/_react.default.createElement(_CloudUpload.default, null),
            component: "span",
            size: size,
            style: {
              minHeight: '36px',
              backgroundColor: watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name ? '#d6d6d4' : '#00dcff'
            }
          }, watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name && watch(registerName)[0].name.substring(0, title && title.length) || title || 'Upload')), /*#__PURE__*/_react.default.createElement("span", {
            style: {
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }
          }, fileName && watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name)))), errors && _lodash.default.get(errors, registerName) && /*#__PURE__*/_react.default.createElement("span", {
            className: "red-text",
            style: {
              color: '#f44336'
            }
          }, _lodash.default.get(errors, registerName)['message']))
        });

      case 'attachment':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, title && /*#__PURE__*/_react.default.createElement("label", {
            htmlFor: name,
            className: classes.label
          }, title + ': '), preValue.defaultValue && /*#__PURE__*/_react.default.createElement(_Attachment2.default, {
            src: preValue.defaultValue
          }))
        });

      case 'array':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({
              overflowX: 'auto'
            }, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_FieldArray.default, {
            path: registerName,
            control,
            register,
            defaultValues,
            getValues,
            watch,
            setError,
            clearErrors,
            setValue,
            onBlur: fldName => {
              _onBlur(fldName);
            },
            errors,
            name,
            disabled,
            reset,
            subFields,
            style,
            arrLayout: field.layout,
            columns: field.columns
          }))
        });

      case 'table':
        return preValue.defaultValue && /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_Table.default, {
            columns: field.columns,
            rows: preValue.defaultValue
          })
        });

      case 'section':
        return /*#__PURE__*/_react.default.createElement(FieldWrapper, {
          type: layout && layout.type,
          attr: {
            xs: xsv,
            key: name,
            spacing: spacing,
            style: _objectSpread({}, style)
          },
          content: /*#__PURE__*/_react.default.createElement(_Grid.default, {
            container: true,
            spacing: 2
          }, title && /*#__PURE__*/_react.default.createElement(_Grid.default, {
            item: true,
            xs: 12,
            className: classes.label
          }, title + ': '), /*#__PURE__*/_react.default.createElement(Fields, sectionProps))
        });

      default:
        return /*#__PURE__*/_react.default.createElement(_Grid.default, {
          item: true,
          xs: xsv,
          key: name
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "red-text"
        }, "Invalid Field"));
    }
  }));
}

var _default = Fields;
exports.default = _default;