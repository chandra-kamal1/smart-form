"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _reactHookForm = require("react-hook-form");

var _Fields = _interopRequireDefault(require("./component/Fields"));

var _TopWrapper = _interopRequireDefault(require("./component/TopWrapper"));

var _lodash = _interopRequireDefault(require("./lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

const ArrayCard = _ref => {
  let {
    name,
    label,
    onChange,
    defaultValue,
    register
  } = _ref;
  const [data, setData] = (0, _react.useState)([{
    name: 'chandra kamal'
  }]);

  const handelAddMore = () => {
    setData([...data, {
      name: ""
    }]);
  };

  const handelChange = (e, i) => {
    let d = data;
    d[i].name = e.target.value;
    setData(d);
    setTimeout(() => {
      onChange(data);
    }, 0);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: () => handelAddMore()
  }, "Add More"), /*#__PURE__*/_react.default.createElement("div", null, data && data.map((d, i) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "name",
    name: "name",
    defaultValue: d && d.name,
    value: d && d.name,
    ref: register,
    onChange: e => handelChange(e, i)
  }), /*#__PURE__*/_react.default.createElement("br", null)))));
};

const useStyles = (0, _core.makeStyles)(() => ({
  cell: {
    align: "center",
    padding: 8
  },
  rootFirstSelect: {
    padding: "14px"
  },
  rootSecondSelect: {
    padding: "10px 80px"
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
    background: '#f6f7f9',
    textAlign: 'center',
    padding: '8px 14px',
    marginBottom: '16px',
    fontSize: '18px',
    fontWeight: '400'
  },
  buttonBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  button: {// margin: 5
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})); // Reusable Form Component

function Form(_ref2) {
  let {
    template,
    onSubmit,
    watchFields,
    validate,
    onChange,
    onBlur,
    mode,
    defaultValues,
    buttons,
    onCancel,
    disabled,
    success
  } = _ref2;
  const classes = useStyles();
  const refSubmitButtom = (0, _react.useRef)([]);
  const [values, setValues] = (0, _react.useState)({});
  const [buttonName, setButtonName] = (0, _react.useState)("");
  const [urName, setUrName] = (0, _react.useState)({});
  const [unregisterd, setUnregisterd] = (0, _react.useState)([]);
  const [btnDisable, setBtnDisable] = (0, _react.useState)({});
  const [valid, setValid] = (0, _react.useState)(true);
  let {
    register,
    unregister,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isDirty
    },
    trigger,
    watch,
    setError,
    clearErrors,
    control,
    setValue,
    getValues,
    reset
  } = (0, _reactHookForm.useForm)({
    defaultValues: defaultValues
  });
  let {
    layout,
    title,
    fields,
    sections
  } = template;

  const handelChange = (name, value) => {
    let val = values;
    val = _objectSpread(_objectSpread({}, val), {}, {
      [name]: value
    });
    onChange(val);
    setValues(_objectSpread({}, val));
  };

  const handleBlur = async fldname => {
    if (mode == 'all:onBlur') {
      const result = await trigger();
      console.log("result", result);
    } else if (mode == 'onBlur') {
      const result = await trigger(fldname);
      console.log("result", fldname, result);
    }

    try {
      onBlur(watch());
    } catch (err) {// console.log(err)
    }
  };

  function isEmpty(value) {
    return value == null || value.hasOwnProperty('length') && value.length === 0 || value.constructor === Object && Object.keys(value).length === 0;
  }

  let urtemp = {};

  const setObjUnName = (obj, fldname) => {
    let unst = urtemp;
    obj && obj.forEach(uobj => {
      if (unst && unst[uobj]) {
        if (!unst[uobj].includes(fldname)) {
          unst[uobj].push(fldname);
        }
      } else {
        unst = _objectSpread(_objectSpread({}, unst), {}, {
          [uobj]: [fldname]
        });
      }
    });
    urtemp = unst;
    setUrName(urtemp);
  };

  function getNameByKeyName(obj, propKey, btnName) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          if (property === propKey) {
            setObjUnName(obj[propKey], obj.name);
          } else if (isEmpty(obj[property])) {
            setObjUnName(obj[propKey], obj.name);
          } else {
            getNameByKeyName(obj[property], propKey, btnName);
          }
        } else {
          if (property === propKey) {
            setObjUnName(obj[propKey], obj.name);
          }

          if (isEmpty(obj[property])) {
            setObjUnName(obj[propKey], obj.name);
          }
        }
      }
    }
  }

  (0, _react.useEffect)(() => {
    if (template) {
      let bts = {};
      getNameByKeyName(template, 'unregister');

      if (buttons && buttons.length) {
        buttons.forEach((btn, i) => {
          bts = _objectSpread(_objectSpread({}, bts), {}, {
            [btn]: false
          });
        });
        setBtnDisable(bts);
        refSubmitButtom.current = buttons.map((element, i) => {
          var _refSubmitButtom$curr;

          return (_refSubmitButtom$curr = refSubmitButtom.current[i]) !== null && _refSubmitButtom$curr !== void 0 ? _refSubmitButtom$curr : /*#__PURE__*/(0, _react.createRef)();
        });
      }
    }
  }, [template]);
  (0, _react.useEffect)(() => {
    let bts = {};

    if (buttons && buttons.length) {
      buttons.forEach((btn, i) => {
        bts = _objectSpread(_objectSpread({}, bts), {}, {
          [btn]: success == null && success == false ? true : false
        });
      });
      setBtnDisable(bts);
    }
  }, [success]); // let watchValues = watch(watchFields);
  // console.log('watchValues :>> ', watchValues);
  // if(validate){
  //     validate(watchValues, { errors, setError, clearErrors, setValid});
  // }

  const handlesubmit = (btn, index) => {
    setButtonName(btn);

    if (urName[btn] && urName[btn].length) {
      // console.log(`urName`, urName)
      urName[btn] && unregister(urName[btn]);
    }

    refSubmitButtom && refSubmitButtom.current && refSubmitButtom.current[index] && refSubmitButtom.current[index].current.click();
  };

  const FormButtons = () => {
    let btnHtml = [];

    if (buttons && buttons.length) {
      buttons.forEach((btn, i) => {
        // btn = btn.toLowerCase();
        if (btn !== 'reset') {
          if ("btn", btn !== 'cancel') {
            btnHtml.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
              className: classes.button,
              key: btn,
              type: "button",
              variant: "raised",
              component: "button",
              disabled: btnDisable[btn],
              variant: "contained",
              color: "primary",
              size: layout.size,
              onClick: () => handlesubmit(btn, i)
            }, btn), /*#__PURE__*/_react.default.createElement("button", {
              hidden: true,
              ref: refSubmitButtom.current[i],
              type: "submit",
              onClick: handleSubmit(data => {
                onSubmit({
                  data,
                  button: btn
                });
                setBtnDisable(_objectSpread(_objectSpread({}, btnDisable), {}, {
                  [btn]: true
                }));
              })
            })));
          } else {
            btnHtml.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
              className: classes.button,
              key: btn,
              variant: "raised",
              component: "span",
              variant: "contained",
              color: "primary",
              size: layout.size,
              onClick: onCancel
            }, btn));
          }
        } else {
          if (btn == 'reset') {
            btnHtml.push( /*#__PURE__*/_react.default.createElement(_Button.default, {
              className: classes.button,
              key: btn,
              variant: "raised",
              component: "span",
              variant: "contained",
              color: "primary",
              size: layout.size,
              onClick: () => reset(defaultValues || {})
            }, btn));
          }
        }
      });
    }

    if (layout && layout !== "flex") {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: classes.buttonBox
      }, btnHtml);
    }

    return btnHtml;
  }; // useEffect(() => {
  //     reset(defaultValues);
  // }, [defaultValues])


  const formRender = () => {
    let xsv = column => {
      return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 4 ? 3 : column == 6 ? 2 : column == 6 ? 2 : 12;
    };

    let spacing = space => {
      return space || 2;
    };

    let size = sz => {
      return sz || "";
    };

    let html = [];

    if (title) {
      html.push( /*#__PURE__*/_react.default.createElement("h4", {
        className: classes.formTitle
      }, title));
    }

    for (const temp in template) {
      if (temp == "fields") {
        html.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TopWrapper.default, {
          type: layout && layout.type,
          spacing: spacing(layout && layout.spacing)
        }, /*#__PURE__*/_react.default.createElement(_Fields.default, {
          register,
          errors,
          watch,
          setError,
          clearErrors,
          control,
          setValue,
          getValues,
          onChange,
          onBlur: fldname => handleBlur(fldname),
          defaultValues,
          reset,
          fields,
          layout: {
            xsv: xsv(layout && layout.column),
            spacing: spacing(layout && layout.spacing),
            size: size(layout && layout.size),
            label: layout && layout.label
          }
        }))));
      } else if (temp == "sections") {
        sections.forEach(ele => {
          html.push( /*#__PURE__*/_react.default.createElement("div", {
            key: ele.fields.name
          }, ele && ele.title && /*#__PURE__*/_react.default.createElement("h2", {
            className: classes.sectionTitle
          }, ele.title), /*#__PURE__*/_react.default.createElement(_TopWrapper.default, {
            type: layout && layout.type,
            spacing: spacing(layout && layout.spacing)
          }, /*#__PURE__*/_react.default.createElement(_Fields.default, {
            register,
            errors,
            watch,
            control,
            setValue,
            setError,
            clearErrors,
            getValues,
            onChange,
            onBlur: fldname => handleBlur(fldname),
            disabled,
            defaultValues,
            reset,
            fields: ele.fields,
            layout: {
              xsv: xsv(ele.layout && ele.layout.column || layout && layout.column),
              spacing: spacing(ele.layout && ele.layout.spacing || layout && layout.spacing),
              size: size(ele.layout && ele.layout.size || layout && layout.size),
              label: ele.layout && ele.layout.label || layout && layout.label,
              type: ele.layout && ele.layout.type || layout && layout.type
            }
          }), layout && layout.type == "flex" && /*#__PURE__*/_react.default.createElement(FormButtons, null))));
        });
      }
    }

    return html;
  };

  return /*#__PURE__*/_react.default.createElement("div", null, formRender(), layout && layout.type !== "flex" && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), !disabled && buttons && buttons.length && /*#__PURE__*/_react.default.createElement("div", {
    className: classes.btnContainer
  }, /*#__PURE__*/_react.default.createElement(FormButtons, null))));
}

var _default = Form;
exports.default = _default;