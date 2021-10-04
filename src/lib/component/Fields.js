import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import CancelIcon from "@material-ui/icons/Cancel";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import FieldArray from './FieldArray';
import TopWrapper from './TopWrapper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from './Table';
import _ from '../lodash';
import Tooltip from '@material-ui/core/Tooltip';
import CKEditor from "react-ckeditor-component";
import { matchSorter } from 'match-sorter';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { unregister } from '../serviceWorker';
import Attachment from '../Attachment';

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}

export const FieldWrapper = ({ type, content, attr }) => {

	if (type && type == 'table') {
		return (
			<TableCell className="p-4" component="th" scope="row" style={{ verticalAlign: 'top' }} >
				{content}
			</TableCell>
		)
	} else if (type && type == 'flex') {
		return (
			<div {...attr}>
				{content}
			</div>
		)
	} else {
		return (
			<Grid item {...attr}>
				{content}
			</Grid>
		)
	}
}

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

const useStyles = makeStyles((theme) => ({
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
		maxWidth: 300,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
	attachFile: {
		border: '1px solid #c4c4c4',
		borderRadius: '4px',
		'& label': {
			width: '100%',
			padding: '18px 14px',
			'&:hover': {
				cursor: 'pointer',
			}
		},
		'& img': {
			display: 'inline-block',
			marginRight: '10px',
		},
		'&:hover': {
			border: '1px solid #767676',
		}
	}
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, multiselect, theme) {
	return {
		fontWeight:
			multiselect.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

function validator(v1, sm1, v2) {
	if (sm1 == ">") {
		return v1 > v2
	} else if (sm1 == "<") {
		return v1 < v2
	} else if (sm1 == "==") {
		return v1 == v2
	} else if (sm1 == "===") {
		return v1 === v2
	} else if (sm1 == "!=") {
		return v1 != v2
	} else if (sm1 == "!==") {
		return v1 !== v2
	} else if (sm1 == "<=") {
		return v1 <= v2
	} else if (sm1 == ">=") {
		return v1 >= v2
	}
}


function Fields({
	register,
	errors,
	watch,
	control,
	setValue,
	setError,
	clearErrors,
	getValues,
	onChange,
	onBlur,
	disabled,
	defaultValues,
	fields,
	layout,
	reset,
	path
}) {
	const classes = useStyles();
	const theme = useTheme();
	const [values, setValues] = useState({});
	const [multiSelect, setMultiSelect] = useState([]);
	const [inputAutoValue, setInputAutoValue] = useState(null)

	let { xsv, spacing, size } = layout;

	const fxsv = (column) => { return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 6 ? 2 : 12 }
	const fspacing = (space) => { return space || 2 };
	const fsize = (sz) => { return sz || "" };

	const handelChange = (name, value) => {
		let val = values;
		val = {
			...val,
			[name]: value
		};
		if (onChange) {
			onChange(val);
		}
		setValues({ ...val });
	};


	const handelSaveValue = (name, value) => {
		setValue(name, value);
	};

	const handelChangeCkEditor = (name, value) => {}

	const calculation = ({ field, name }) => {
		let start = _.some(field.calculation.from, _.method('includes', '*'));
		let forThis = _.some(field.calculation.from, _.method('includes', 'this*'));
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
					})
				}
			} else {
				let wf = watch(val);
				watchValues.push(Number(wf))
			}
		});


		if (field.calculation.type == "add") {
			let calc = 0;
			if (watchValues.length) {
				watchValues.forEach(val => {
					if (val) {
						calc += val;
					}
				})
			}
			if (watch(name) !== calc) {
				setValue(name, calc)
			}
			return calc || 0
		} else if (field.calculation.type == "multiplication") {
			let calc = 1;
			if (watchValues.length) {
				watchValues.forEach(val => {
					if (val) {
						calc *= val;
					}
				})
			}
			if (watch(name) !== calc) {
				setValue(name, calc)
			}
			return calc || 0
		} else if (field.calculation.type == "division") {
			let calc = 0;
			if (watchValues.length) {
				watchValues.forEach(val => {
					if (val) {
						calc /= val;
					}
				})
			}
			if (watch(name) !== calc) {
				setValue(name, calc)
			}
			return calc || 0
		}
	}

	return (
		<>
			{fields.map(field => {
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
					style,
				} = field;
				let disableField = {};
				if (field && field.disabled == false) {
					disableField = {}
				} else if (field && field.disabled == true) {
					disableField = {
						disabled: 'disabled'
					}
				} else if (disabled) {
					disableField = {
						disabled: 'disabled'
					}
				}

				if (field && field.type !== 'section' && field.layout && field.layout.column) {
					xsv =
						field.layout.column == 1
							? 12
							: field.layout.column == 2
								? 6
								: field.layout.column == 3
									? 4
									: 12;
				}

				let maxDate = {}, minDate = {};

				if (field && field.type == "date") {
					if (field && field.min == "today") {
						minDate = {
							inputProps: {
								min: todayDate()
							}
						}
					} else if (field && field.max == "today") {
						minDate = {
							inputProps: {
								max: todayDate()
							}
						}
					}
					if (field && field.min && field.min !== "today") {
						minDate = {
							inputProps: {
								min: todayDate()
							}
						}
					} else if (field && field.max == "today") {
						minDate = {
							inputProps: {
								max: todayDate()
							}
						}
					}
				}


				if (defaultValues) {
					preValue = {
						defaultValue: defaultValues[name] || defaultValue
					};
					if (type == "multiSelect" && _.isArray(preValue.defaultValue) == false) {
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
					onBlur:fldname=>onBlur(fldname),
					reset,
					defaultValues,
					fields: field.fields,
					layout: { xsv: fxsv((field.layout && field.layout.column) || (layout && layout.column)), spacing: fspacing((field.layout && field.layout.spacing) || (layout && layout.spacing)), size: fsize((field.layout && field.layout.size) || (layout && layout.size)), label: (field.layout && field.layout.label) || (layout && layout.label), type: (field.layout && field.layout.type) || (layout && layout.type) }
				}

				let registerName = name;
				if (path) {
					registerName = `${path}.${name}`;
					preValue = {
						defaultValue: _.get(defaultValues, registerName)
					}
					sectionProps = {
						...sectionProps,
						path: path
					}
				}

				if (type == "multiSelect" && preValue && preValue.defaultValue && preValue.defaultValue.length && multiSelect.length == 0) {
					setMultiSelect({ ...multiSelect, [registerName]: preValue.defaultValue });
				}

				if (type == "autocomplete" && preValue && preValue.defaultValue && !inputAutoValue) {
					const res = options.filter(ele => {
						return ele.value == preValue.defaultValue
					})

					preValue.defaultValue = res[0];
				}

				if (bind) {
					if (bind && bind.field && bind.field.indexOf('*') == -1) {
					} else {
						let dName = bind && `${path}.${bind['field'].split('*')[1]}`;

						if (bind.data[watch(dName)] && watch(registerName) !== bind.data[watch(dName)]) {
							setValue(registerName, bind.data[watch(dName)] || 0)
						}
						preValue = {
							defaultValue: bind.data[watch(dName)] || 0
						}
					}
				}
				
				let filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['value', 'title'] });

				let validateObj = {}

				if (!_.isEmpty(validationProps)) {
					let enableValidation = true;
					if (validationProps.validateRow && validationProps.validateRow.length) {
						let tempchaker = false;
						validationProps.validateRow.forEach(fldname => {
							if (watch(path + '.' + fldname)) {
								tempchaker = true;
							}
						})
						if (!tempchaker) {
							enableValidation = false;
						}
					}
					if (validationProps.enable) {
						let cs = validationProps.enable.split(" ");
						if (validationProps.enable.indexOf('"') > -1) {
							var sp1 = validationProps.enable.split('"');
							cs = sp1[0].trim().split(' ');
							cs.push(sp1[1])
						}

						cs.forEach((element, i) => {
							if (!(element && element.indexOf('*') == -1)) {
								cs[i] = `${path}.${element.split('*')[1]}`;
							}
						});
						let checker = validator(watch(cs[0]), cs[1], cs[2])


						enableValidation = checker
						if (!checker) {
							validateObj = {
								required: false,
								validate: false,
								manual: false
							}
						}
						if (!checker && _.get(errors, registerName)) {
							// clearErrors(registerName);
						}
					}
					if (enableValidation) {
						for (const vp in validationProps) {
							if (vp == "required") {
								validateObj = {
									...validateObj,
									required: validationProps[vp]
								}
							} else if (vp == "validate" && validationProps[vp].length) {
								validationProps[vp].forEach((vld, i) => {
									let cs = vld.condition.split(" ");
									cs.forEach((element, i) => {
										if (!(element && element.indexOf('*') == -1)) {
											cs[i] = `${path}.${element.split('*')[1]}`;
										}
									});
									let checker = validator(watch(cs[0]), cs[1], watch(cs[2]))

									if (type == "date") {
										checker = validator(new Date(watch(cs[0])), cs[1], new Date(watch(cs[2])))
									}
									if (checker && _.get(errors, registerName)) {
										// clearErrors(registerName);
									}
									if (validateObj.validate) {
										validateObj = {
											...validateObj,
											validate: {
												...validateObj.validate,
												["validate" + i]: (value) => checker || vld.message
											}
										}

									} else {
										validateObj = {
											...validateObj,
											validate: {
												["validate" + i]: (value) => checker || vld.message
											}
										}
									}

								})
							} else if (vp == "manual" && validationProps[vp].length) {
								validationProps[vp].forEach((vld, i) => {
									let cs = vld.condition.split(" ");
									cs.forEach((element, i) => {
										if (!(element && element.indexOf('*') == -1)) {
											cs[i] = `${path}.${element.split('*')[1]}`;
										}
									});
									let checker = validator(watch(cs[0]), cs[1], (Number(cs[2]) || cs[2]))
									if (type == "date") {
										if (cs[2] == "today") {
											checker = validator(new Date(watch(cs[0])), cs[1], new Date(todayDate()))
										} else {
											checker = validator(new Date(watch(cs[0])), cs[1], new Date(watch(cs[2])))
										}
									}
									if (validateObj.validate) {
										validateObj = {
											...validateObj,
											validate: {
												...validateObj.validate,
												["validateManual" + i]: (value) => checker || vld.message
											}
										}
									} else {
										validateObj = {
											...validateObj,
											validate: {
												["validateManual" + i]: (value) => checker || vld.message
											}
										}
									}
								})
							} else if (vp == "maxLength" && Object.keys(disableField).length === 0) {
								console.log("registerName", registerName);
								let ml = watch(registerName);
								if (ml && ml.length > validationProps[vp].value && !_.get(errors, registerName)) {
									setError(registerName, {
										type: "maxLength",
										message: validationProps[vp].message
									})
								} else if (ml && ml.length <= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'maxLength') {
									clearErrors(registerName)
								}
							} else if (vp == "minLength") {
								let ml = watch(registerName);
								if (ml && ml.length < validationProps[vp].value && !_.get(errors, registerName)) {
									setError(registerName, {
										type: "minLength",
										message: validationProps[vp].message
									})
								} else if (ml && ml.length >= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'minLength') {
									clearErrors(registerName)
								}
							} else if (vp == "max") {
								let ml = watch(registerName);
								if (ml > validationProps[vp].value && !_.get(errors, registerName)) {
									setError(registerName, {
										type: "max",
										message: validationProps[vp].message
									})
								} else if (ml <= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'max') {
									clearErrors(registerName)
								}
							} else if (vp == "min") {
								let ml = watch(registerName);
								if (ml < validationProps[vp].value && !_.get(errors, registerName)) {
									setError(registerName, {
										type: "min",
										message: validationProps[vp].message
									})
								} else if (ml >= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'min') {
									clearErrors(registerName)
								}
							} else if (vp == "size" && type == "file") {
								let filesize = watch(registerName) && watch(registerName)[0] && watch(registerName)[0].size || 0;
								let fsz = (filesize / 1024);
								if (fsz > (validationProps[vp].value * 1024) && !_.get(errors, registerName)) {
									setError(registerName, {
										type: "size",
										message: validationProps[vp].message
									})
								} else if (fsz <= (validationProps[vp].value * 1024) && _.get(errors, registerName) && _.get(errors, registerName).type === 'size') {
									clearErrors(registerName)
								}
							} else if (vp == "pattern") {
								validateObj = {
									...validateObj,
									pattern: {
										value: validationProps[vp].value,
										message: validationProps[vp].message
									}
								}
							}
						}
					}
				}

				let showField = true;
				if (dynamic) {
					unregister(dynamic.field);
					if (dynamic && dynamic.field && dynamic.field.indexOf('*') == -1) {
						const wv = _.isObject(watch(dynamic['field'])) ? watch(dynamic['field']).value : watch(dynamic['field']);

						if (dynamic && dynamic.value) {
							showField = dynamic ? wv && dynamic['value'].includes(wv) : true;
							if (dynamic.value.includes("undefind") && !showField) {
								showField = wv ? false : true;
							}
						} else if (dynamic && dynamic.isNotValue) {
							showField = dynamic ? wv && !dynamic['isNotValue'].includes(wv) : true;
						}
					} else {
						let dName = dynamic && `${path}.${dynamic['field'].split('*')[1]}`;
						const wv = _.isObject(watch(dName)) ? watch(dName).value : watch(dName);

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
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {style}}}
								content={
									<TextField
										id={name}
										{...register(registerName, { ...validateObj })}
										disabled
										variant="outlined"
										fullWidth
										size={size}
										inputProps={{
											maxlength: maxlength,
											minlength: minlength
										}}
										style={{ opacity: 0 }}
									/>
								}
							/>
						)
					case 'hidden':
						return (
							<imput
								type="hidden"
								{...register(registerName, { ...validateObj })}
								{...preValue}
							/>
						);
					case 'text':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style} }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											{...register(registerName, { ...validateObj, pattern })}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											onBlur={()=>onBlur(registerName)}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
											inputProps={{
												maxlength: maxlength,
												minlength: minlength
											}}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'number':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={registerName}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="number"
											{...register(registerName, validateObj)}
											{...preValue}
											value={field && field.calculation ? calculation({ field, name: registerName }) : register(registerName).value}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
												if (e.target.value == 0) {
													setError(name, {
														type: 'manual',
														message: 'Should not be empty or 0.'
													})
												} else if (e.target.value == null || e.target.value > 0) {
													if (errors && _.get(errors, registerName) && _.get(errors, registerName)['type'] === 'manual') {
														clearErrors(name);
													}
												}
											}}
											onBlur={()=>onBlur(registerName)}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
											inputProps={{
												maxlength: maxlength,
												minlength: minlength,
												max: max,
												min: min,
												readOnly: field && field.calculation ? true : false
											}}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'email':
						return (

							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="email"
											{...register(registerName, validateObj)}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											onBlur={()=>onBlur(registerName)}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'tel':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="tel"
											{...register(registerName, validateObj)}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											onBlur={()=>onBlur(registerName)}
											{...disableField}
											variant="outlined"
											inputProps={{
												maxlength: maxlength,
												minlength: minlength,
												min: min,
												max: max
											}}
											fullWidth
											size={size}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'textarea':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											multiline
											rows={4}
											{...register(registerName, { ...validateObj, pattern })}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											onBlur={()=>onBlur(registerName)}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
											inputProps={{
												maxlength: maxlength,
												minlength: minlength
											}}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'checkbox':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										<FormControl
											component="fieldset"
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											size={size}
											style={{ flexDirection: 'row' }}
										>
											<label
												htmlFor={name}
												style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
											>
												{title} :{' '}
											</label>
											<Controller
												{...register(registerName, validateObj)}
												control={control}
												render={({ field }) => (
													<FormControlLabel
														{...field}
														onChange={e => {
															field.onChange(e);
															handelChange(name, e.target.checked);
															handelSaveValue(name, e.target.checked);
															onBlur(registerName);
														}}
														
														{...disableField}
														control={
															<Checkbox
																defaultChecked={preValue.defaultValue}
																id={name}
																color="primary"
															/>
														}
													/>
												)}
											/>
											{_.get(errors, registerName) && _.get(errors, registerName).type === 'required' && (
												<FormHelperText style={{ display: 'flex', alignItems: 'center' }}>
													{_.get(errors, registerName).message}
												</FormHelperText>
											)}
										</FormControl>
									</>
								}
							/>
						);
					case 'radio':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										<FormControl
											component="fieldset"
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											size={size}
										>
											<label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
												{title} :{' '}
											</label>
											<Controller
												{...register(registerName, validateObj)}
												control={control}
												render={({ field }) => (
													<>
														<RadioGroup
															{...field}
															onChange={e => {
																field.onChange(e);
																handelChange(name, e.target.value);
																handelSaveValue(name, e.target.value);
																onBlur(registerName);
															}}
															row
															style={{ height: '62px' }}
														>
															{options.map(radio => (
																<FormControlLabel
																	value={radio.value}
																	{...disableField}
																	{...preValue}
																	control={<Radio size={size} />}
																	label={radio.title}
																	labelPlacement={radio.labelPlacement || 'start'}
																/>
															))}
														</RadioGroup>
													</>
												)}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') && (
												<FormHelperText style={{ display: 'flex', alignItems: 'center' }}>
													{_.get(errors, registerName).message}
												</FormHelperText>
											)}
										</FormControl>
									</>
								}
							/>
						);
					case 'slider':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										<FormControl
											component="fieldset"
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											size={size}
											style={{ width: '100%' }}
										>
											<label
												htmlFor={name}
												style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
											>
												{title}:
											</label>
											<Controller
												control={control}
												{...preValue}
												{...register(registerName, validateObj)}
												render={({ field: { onChange } }) => (
													<Slider
														name={name}
														onChange={(_, value) => {
															onChange(value);
															handelChange(name, value);
															handelSaveValue(name, value);
															onBlur(registerName);
														}}
														{...disableField}
														valueLabelDisplay="auto"
														defaultValue={preValue.defaultValue}
														max={0}
														max={max}
														step={1}
													/>
												)}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') && (
												<FormHelperText style={{ display: 'flex', alignItems: 'center' }}>
													{_.get(errors, registerName).message}
												</FormHelperText>
											)}
										</FormControl>
									</>
								}
							/>
						);
					case 'date':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="date"
											{...register(registerName, { ...validateObj })}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
												onBlur(registerName);
											}}
											{...disableField}
											defaultValue={preValue.defaultValue && formatDate(preValue.defaultValue)}
											// {...preValue}
											InputLabelProps={{
												shrink: true
											}}
											{...minDate}
											{...maxDate}
											// inputProps={{
											// 	min: todayDate()
											// }}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'select':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && title && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<FormControl
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											variant="outlined"
											fullWidth
											size={size}
										>
											{layout.label !== 'fixed' && title && <InputLabel id={name}>{title}</InputLabel>}
											<Controller
												render={({ field }) => {
													let properties = {};
													if (layout.label !== 'fixed') {
														properties = {
															labelId: name,
															label: title
														};
													}
													return (
														<>
															<Select
																native
																id={name}
																{...properties}
																{...field}
																onChange={e => {
																	field.onChange(e);
																	handelChange(name, e.target.value);
																	handelSaveValue(name, e.target.value);
																	onBlur(registerName);
																}}
																{...disableField}
															>
																<option value="" />
																{options && options.map(option => (
																	<option value={option.value}>{option.title}</option>
																))}
															</Select>
														</>
													);
												}}
												control={control}
												{...preValue}
												{...register(registerName, validateObj)}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') && (
												<FormHelperText>{_.get(errors, registerName).message}</FormHelperText>
											)}
										</FormControl>
									</>
								}
							/>
						);
					case 'autocomplete':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && title && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<Autocomplete
											id={name}
											{...preValue}
											{...register(registerName, validateObj)}
											onChange={(e, data) => {
												register(registerName).onChange(e);
												handelChange(name, data);
												data && data.value && handelSaveValue(registerName, data.value);
											}}
											onBlur={()=>onBlur(registerName)}
											options={options}
											getOptionLabel={(option) => option.title}
											style={{ width: '100%', minWidth: '135px' }}
											fullWidth
											size={size}
											renderInput={(params) => <TextField
												{...params}
												label={layout.label !== 'fixed' && title}
												variant="outlined"
												size={size}
												style={{ minWidth: '75px' }}
											/>}
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
										/>
										{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') && (
											<FormHelperText>{_.get(errors, registerName).message}</FormHelperText>
										)}
									</>
								}
							/>
						);
					case 'multiSelect':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<FormControl
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											variant="outlined"
											fullWidth
											size={size}
										>
											{layout.label !== 'fixed' && <InputLabel id={name}>{title}</InputLabel>}
											<Select
												labelId={name}
												id="demo-mutiple-chip"
												multiple
												{...preValue}
												{...register(registerName, validateObj)}
												value={multiSelect && multiSelect[registerName] ? multiSelect[registerName] : (preValue && 'defaultValue' in preValue && _.isArray(preValue.defaultValue) ? preValue.defaultValue : [])}
												onChange={e => {
													setMultiSelect({ ...multiSelect, [registerName]: e.target.value });
													register(registerName).onChange(e);
													handelChange(name, e.target.value);
													handelSaveValue(registerName, e.target.value);
												}}
												onBlur={()=>onBlur(registerName)}
												input={<Input id="select-multiple-chip" />}
												renderValue={(selected) => (
													<div className={classes.chips}>
														{selected && selected.length && selected.map((value) => (
															value &&
																Object.keys(disableField).length === 0 ?
																<Chip
																	key={value}
																	label={(options && options.filter(ch => ch.value == value)[0] && options.filter(ch => ch.value == value)[0].title)
																		? (options && options.filter(ch => ch.value == value)[0].title) : null}
																	clickable
																	deleteIcon={
																		<CancelIcon
																			onMouseDown={(event) => event.stopPropagation()}
																		/>
																	}
																	className={classes.chip}
																	onDelete={(e) => {
																		let ms = multiSelect && multiSelect[registerName];
																		let index = ms.indexOf(value);
																		if (index > -1) {
																			ms.splice(index, 1);
																		}
																		setMultiSelect({ ...multiSelect, [registerName]: ms });
																		handelChange(name, ms);
																		handelSaveValue(name, ms);
																	}}
																/> :
																<Chip
																	key={value}
																	label={(options && options.filter(ch => ch.value == value)[0] && options.filter(ch => ch.value == value)[0].title)
																		? (options && options.filter(ch => ch.value == value)[0].title) : null}
																	clickable
																	className={classes.chip}
																/>
														))}
													</div>
												)}
												MenuProps={MenuProps}
												variant="outlined"
												{...disableField}
											>
												<MenuItem value="" />
												{options && options.length && options.map(option => (
													<MenuItem key={option.value} value={option.value} style={getStyles(option.value, (multiSelect[registerName] || []), theme)}>{option.title}</MenuItem>
												))}
											</Select>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual') && (
												<FormHelperText>{_.get(errors, registerName).message}</FormHelperText>
											)}
										</FormControl>
									</>
								}
							/>
						);
					case 'url':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{/* <label htmlFor={name}>{title}</label> */}
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="url"
											{...register(registerName, validateObj)}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											onBlur={()=>onBlur(registerName)}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
										/>
										{errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
									</>
								}
							/>
						);
					case 'ckeditor':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{/* <label htmlFor={name}>{title}</label> */}
										{layout.label == 'fixed' && title && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<CKEditor 
											config={{
												toolbar: [
														// { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates' ] },
														// { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
														// { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
														// { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
														'/',
														{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
														{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
														{ name: 'links', items: [ 'Link', 'Unlink'] },
														{ name: 'insert', items: [ 'Table', 'HorizontalRule','PageBreak'] },
														'/',
														{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
														{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
														{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
														// { name: 'others', items: [ '-' ] },
														// { name: 'about', items: [ 'About' ] }
													],
													readOnly: disabled
												}
											}
											activeClass="p10"
											content={watch(name)}
											events={{
												change: (e) => {
													const data = e.editor.getData();
													if(data !== watch(name)){
														handelChangeCkEditor(name, data);
														handelSaveValue(name, data);
													}
												},
												blur: () => onBlur(registerName)
											}}
										/>
										<input 
											{...preValue}
											{...register(registerName, validateObj)}
											value={preValue.defaultValue}
											type="hidden"
										/>
										{errors && _.get(errors, registerName) && <span className="red-text" style={{ color: '#f44336' }}>{_.get(errors, registerName)['message']}</span>}
									</>
								}
							/>
						);
					case 'file':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
											<input
												accept={accept}
												className={classes.input}
												style={{ display: 'none' }}
												id={registerName}
												multiple={multiple}
												type="file"
												{...register(registerName, validateObj)}
												onChange={e => {
													register(registerName).onChange(e);
													handelChange(name, e.target.files[0]);
													onBlur(registerName);
												}}
											/>
											<Tooltip title={watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name || "Add File"}>
												<label htmlFor={registerName}>
													<div color={watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name ? "secondry" : "primary"} aria-label="upload picture" size={size} component="span">
														<Button
															variant="contained"
															color="default"
															startIcon={<CloudUploadIcon />}
															component="span"
															size={size}
															style={{ minHeight: '36px', backgroundColor: watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name ? '#d6d6d4' : '#00dcff' }}
														>
															{watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name && watch(registerName)[0].name.substring(0, title && title.length) || title || 'Upload'}
														</Button>
													</div>
													<span
														style={{
															marginLeft: '10px',
															display: 'flex',
															alignItems: 'center',
															height: '100%'
														}}
													>
														{fileName && watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name}
													</span>
												</label>
											</Tooltip>


										</div>
										{errors && _.get(errors, registerName) && (
											<span className="red-text" style={{ color: '#f44336' }}>{_.get(errors, registerName)['message']}</span>
										)}
									</>
								}
							/>
						);
					case 'attachment':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<>
										{title && (<label htmlFor={name} className={classes.label}>
											{title + ': '}
										</label>)}
										{preValue.defaultValue && <Attachment src={preValue.defaultValue} />}
									</>
								}
							/>
						);
					case 'array':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: { overflowX: 'auto', ...style } }}
								content={
									<>
										<FieldArray
											{...{
												path: registerName,
												control,
												register,
												defaultValues,
												getValues,
												watch,
												setError,
												clearErrors,
												setValue,
												onBlur:fldName=>{onBlur(fldName)},
												errors,
												name,
												disabled,
												reset,
												subFields,
												style,
												arrLayout: field.layout,
												columns: field.columns
											}}
										/>
									</>
								}
							/>
						);
					case 'table':
						return (
							(preValue.defaultValue && (
								<FieldWrapper
									type={layout && layout.type}
									attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
									content={
										<Table
											columns={field.columns}
											rows={preValue.defaultValue}
										/>
									}
								/>))
						);
					case 'section':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing, style: {...style}  }}
								content={
									<Grid container spacing={2}>
										{title && (<Grid item xs={12} className={classes.label}>
											{title + ': '}
										</Grid>)}
										<Fields
											{...sectionProps}
										/>
									</Grid>
								}
							/>
						);
					default:
						return (
							<Grid item xs={xsv} key={name}>
								<span className="red-text">Invalid Field</span>
							</Grid>
						);
				}
			})}
		</>
	);
}

export default Fields;
