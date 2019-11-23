import React, { useState } from "react";
import styled, { css } from "styled-components";
import { DataProvider, useDataState, useDataDispatch } from "../src/DataContext";
import { Page, Card } from "@shopify/polaris";
import get from "lodash/get";

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

  height: 100%;
  min-width: 100px;
  max-width: 200px;

  ${props =>
    props.readOnly &&
    css`
      background-color: #f0f0f0;
      text-align: center;
      font-weight: bold;
      color: grey;
    `}

  ${props =>
    props.selected &&
    css`
      border: 1px double #2185d0;
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
`;

function Cell({ x, y, readOnly, content }) {
  // Attach the passed-in className to the DOM node
  const [selected, setSelected] = useState(false);
  const { coordinates } = useDataState();
  const tableDispatch = useDataDispatch();

  // If data can't be edited, don't attach handlers
  if (readOnly) {
    return (
      <TableData readOnly>
        <CellContent>{content}</CellContent>
      </TableData>
    );
  }

  return (
    <TableData selected={coordinates.x == x && coordinates.y == y}>
      <CellContent
        onClick={e => tableDispatch({ type: "SET_SELECTION", coordinates: { x, y } })}
        onDoubleClick={e => {
          console.log("Clicked!");
        }}
        onKeyPress={e => {
          console.log("Clicked!");
        }}
        role='presentation'
      >
        {content}
      </CellContent>
    </TableData>
  );
}

export default Cell;
