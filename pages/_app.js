import "../styles/globals.css";
import Head from "next/head";
import Page from "../components/Page";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Page>
        <Component {...pageProps} />
      </Page>
    </>
  );
}
