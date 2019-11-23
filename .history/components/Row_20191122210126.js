import React from "react";
import styled, { css } from "styled-components";
import { DataProvider, useDataState, useDataDispatch } from "../src/DataContext";
import { Page, Card } from "@shopify/polaris";
import Cell from "./Cell";
import get from "lodash/get";

const TableRow = styled.tr`
  background: #fff;
`;

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
  padding: 1%;

  ${props =>
    props.read_only &&
    css`
      background-color: #dadada;
      text-align: center;
      font-weight: bold;
      color: grey;
    `}
`;

function Row({ y, rowContent, className }) {
  let columns = [];

  for (let x = 0; x < 3 + 1; x += 1) {
    if (x == 0) {
      columns.push(
        <TableData key={-1} read_only>
          <Cell content={y} />
        </TableData>
      );
    }
    columns.push(
      <TableData key={x} className={className}>
        <Cell y={y} x={x} content={get(rowContent, x, "-")} />
      </TableData>
    );
  }

  return <TableRow>{columns}</TableRow>;
}

export default Row;
