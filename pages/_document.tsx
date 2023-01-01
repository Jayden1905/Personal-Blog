import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;500;700&display=swap"
            as="font"
            type="font/IBMPlesSans"
            rel="stylesheet"
          />
        </Head>
        <body className="dark:bg-zinc-900 bg-zinc-200 font-ibm !scroll-auto">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
