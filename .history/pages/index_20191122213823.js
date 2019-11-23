import React from "react";
import ReactDOM from "react-dom";
import { CountProvider, useCountState, useCountDispatch } from "../src/DataContext";

import AppForm from "../components/SubmitForm";
import Table from "../components/Table";
import { Page } from "@shopify/polaris";

function CountDisplay() {
  const { count } = useCountState();
  return count;
}

function Counter() {
  const dispatch = useCountDispatch();
  return <button onClick={() => dispatch({ type: "increment" })}>Increment count</button>;
}

function App() {
  return (
    <CountProvider>
      <CountDisplay />
      <Table width={6} height={5} />
      <AppForm />

      <style global jsx>{`
        .Polaris-Card {
          margin-bottom: 20px;
        }
      `}</style>
    </CountProvider>
  );
}
export default App;
