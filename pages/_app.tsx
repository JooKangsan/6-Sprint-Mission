import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel='icon' href='/Img/icons/favicon.ico'/>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
