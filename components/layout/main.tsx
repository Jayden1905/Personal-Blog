import Head from "next/head";
import Nav from "../Nav";
import Footer from "../Footer";
import { ReactNode } from "react";
import ContextProvider from "../context/ContextProvider";
import { ThemeProvider } from "next-themes";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Oddinary's Blog" />
        <meta name="author" content="Kyaw Za Yan Naing" />
        <meta name="author" content="Oddinary" />
        <meta property="og:title" content="Oddinary's Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://oddinary.vercel.app/" />
        <meta
          property="og:image"
          content="https://oddinary.vercel.app/images/oddinary.png"
        />
        <meta property="og:description" content="Oddinary's Blog" />
        <meta property="og:site_name" content="Oddinary's Blog" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@oddinary" />
        <meta name="twitter:creator" content="@oddinary" />
        <meta name="twitter:title" content="Oddinary's Blog" />
        <meta name="twitter:description" content="Oddinary's Blog" />
        <meta
          name="twitter:image"
          content="https://oddinary.vercel.app/images/oddinary.png"
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;500;700&display=swap"
          as="font"
          type="font/IBMPlesSans"
          rel="fonts"
        />
        <title>Oddinary's Blog</title>
      </Head>

      <ContextProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </div>
  );
};

export default RootLayout;
