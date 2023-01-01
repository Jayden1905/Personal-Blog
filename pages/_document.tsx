import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="!scroll-auto bg-zinc-200 font-ibm dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
