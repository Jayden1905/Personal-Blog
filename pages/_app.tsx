import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Nav />
        <div className="max-w-5xl h-full mt-28 mx-auto px-4">
          <AnimatePresence mode="wait" initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
