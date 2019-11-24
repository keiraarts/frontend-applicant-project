import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useDataState, useDataDispatch, updateCell } from '../src/DataContext';

const TableData = styled.td`
	background: #fff;
	border: 1px solid black;
	height: 17px;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	cursor: cell;
	background-color: unset;
	-webkit-transition: background-color 0.5s ease;
	transition: background-color 0.5s ease;
	vertical-align: middle;
	text-align: right;
	border: 1px solid #ddd;
	min-width: 100px;
	max-width: 200px;

	& span:focus {
		backgrond-color: red;
		-webkit-transition: none;
		transition: none;
		box-shadow: inset 0 -100px 0 rgba(33, 133, 208, 0.15);
	}

	${props =>
		props.readOnly &&
		css`
			background-color: #f0f0f0;
			text-align: center;
			font-weight: bold;
			color: grey;
		`}

	${props =>
		props.error &&
		css`
			border: 1px double red;
			-webkit-transition: none;
			transition: none;
			box-shadow: inset 0 -100px 0 rgba(33, 133, 208, 0.15);
		`}
`;

const CellContent = styled.span`
	font-size: 16px;
	height: 100%;
	padding: 2px 5px 2px 0px;
	display: block;
	min-height: 25px;
	vertical-align: middle;
	line-height: 170%;
	overflow: hidden;
`;

const CellInput = styled.input`
	font-size: 16px;
	line-height: 18px;
	float: left;
	border: 0;
	display: block;
	margin: 0;
	height: 30px;
	width: 100%;
	height: 100%;
	border: 0px;
	text-align: right;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	padding-right: 5px !important;
`;

function Cell({ x, y, readOnly, content }) {
	/*
	 * Ref is a reference to the current element (input/span) rendered
	 * It'll autofocus on the selected cell even if after the input switched to a text element.
	 */
	const ref = useRef(null);
	const [selected, setSelected] = useState(false);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(content);
	// Get the data context object from index.js and get coordinates
	const { tableData, coordinates } = useDataState();
	const tableDispatch = useDataDispatch();

	useEffect(() => {
		// If this current cell is selected by user, focus on it.
		if (coordinates[0] === x && coordinates[1] === y) {
			setSelected(true);
			ref.current.focus();
		}
		/*
		 * If the effect is provided new coordindates we can
		 * assume this cell is no longer being selected or focused on.
		 */
		if (editing) updateCell(tableDispatch, tableData, x, y, e.target.value);

		return function cleanup() {
			setSelected(false);
		};
	}, [coordinates, editing]);

	function handleKeyDown(e) {
		// Arrow keys trigger the dispatch to move selection
		if (e.keyCode > 36 && e.keyCode < 41) {
			tableDispatch({ type: 'ARROW_KEY_PRESS', code: e.keyCode });
			e.preventDefault();
		}
		// Enter key toggles the editable status of the cell
		// It's imporant to save the cell data before toggling
		if (e.keyCode === 13) {
			if (editing) updateCell(tableDispatch, tableData, x, y, e.target.value);
			setEditing(!editing);
		}
	}

	// Set value in table if user inputs data, and selects another cell
	useEffect(() => {
		console.log('selected?', selected);
	}, [selected]);
	// Show grey cell with no handlers
	if (readOnly) {
		return (
			<TableData readOnly>
				<CellContent>{content}</CellContent>
			</TableData>
		);
	}

	if (editing) {
		return (
			<TableData selected={selected}>
				<CellInput
					type='text'
					tabIndex={x + y * 10}
					value={value}
					onKeyDown={e => handleKeyDown(e)}
					onBlur={e => updateCell(tableDispatch, x, y, e.target.value)}
					onChange={e => setValue(e.target.value)}
					ref={ref}
					autoFocus
				/>
			</TableData>
		);
	}

	// Show regular span element else
	return (
		<TableData selected={selected}>
			<CellContent
				tabIndex={x + y * 10}
				onKeyDown={e => handleKeyDown(e)}
				onClick={e => tableDispatch({ type: 'SET_SELECTION', coordinates: [x, y] })}
				onDoubleClick={e => setEditing(true)}
				ref={ref}
			>
				{content}
			</CellContent>
		</TableData>
	);
}

Cell.protoTypes = {
	x: PropTypes.number,
	y: PropTypes.number,
	readOnly: PropTypes.bool,
	content: PropTypes.string,
};

export default Cell;
