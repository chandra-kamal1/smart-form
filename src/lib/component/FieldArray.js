import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TableHead from '@material-ui/core/TableHead';
import { useFieldArray } from 'react-hook-form';
import Fields from './Fields';
import { useEffect } from 'react';

let renderCount = 0;

export default function FieldArray({
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
}) {
	const { fields, append, remove, insert, prepend } = useFieldArray({
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

	useEffect(() => {
		if (!fields.length || fields.length < 1) {
			append();
		}
	}, [fields]);

	return (
		<>
			<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					type="button"
					onClick={() => {
						append();
					}}
					variant="contained"
					color="primary"
					size="small"
				>
					add more
				</Button>
			</Grid>
			<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
				{columns && columns && (
					<TableHead>
						<TableRow className="h-64">
							{columns &&
								columns.map((row, i) => {
									return (
										<TableCell
											className="p-4 md:p-16 height"
											key={i}
											align="center"
											padding={'none'}
										>
											{row}
										</TableCell>
									);
								}, this)}
							<TableCell className="p-4 md:p-16" align="center" padding={'none'}>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
				)}
				{fields.map((item, index) => {
					return (
						<TableRow>
							<Fields
								{...{
									path: `${path}.${index}`,
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
									}
								}}
								onChange={data => console.log(data)}
							/>
							<TableCell className="p-4 md:p-16" align="center" padding={'none'}>
								{index > 0 && (
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="span"
										size="small"
										onClick={() => remove(index)}
									>
										<HighlightOffIcon />
									</IconButton>
								)}
							</TableCell>
						</TableRow>
					);
				})}
			</Table>
		</>
	);
}
