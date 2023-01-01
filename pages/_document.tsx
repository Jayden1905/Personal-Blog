import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="dark:bg-zinc-900 bg-zinc-200 font-ibm !scroll-auto">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
