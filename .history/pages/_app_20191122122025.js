import React from "react";
import App from "next/app";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Loading, Frame } from "@shopify/polaris";

/*
 * Using _app component to wrap the entire
 * application with reusable components.
 */

class MyApp extends App {
  state = { loading: false };
  render() {
    const { loading } = this.state;
    const { Component, pageProps } = this.props;
    return (
      <AppProvider i18n={enTranslations}>
        <Frame>
          {loading ? <Loading /> : null}
          <Component {...pageProps} />
        </Frame>
      </AppProvider>
    );
  }
}

export default MyApp;
