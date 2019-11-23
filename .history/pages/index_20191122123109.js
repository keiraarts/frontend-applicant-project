import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import { DataProvider, useCountState, useCountDispatch } from "../src/DataContext";

import AppForm from "../components/SubmitForm";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/styles.css";

function DataDisplay() {
  const { count } = useDataState();
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const dispatch = useDataDispatch();
  return <button onClick={() => dispatch({ type: "increment" })}>Increment count</button>;
}
const Home = () => (
  <DataProvider>
    <Page title='Spreadsheet App'>
      <DataDisplay />
      <Counter />
      <AppForm />
    </Page>
  </DataProvider>
);

export default Home;
