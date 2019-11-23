import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import AppForm from "../components/SubmitForm";

import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import "@shopify/polaris/styles.css";

const Home = () => (
  <Page title='Spreadsheet App'>
    <AppForm />
  </Page>
);

export default Home;
