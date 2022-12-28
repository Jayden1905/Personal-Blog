import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Nav />
        <div className="max-w-5xl relative top-28 mx-auto px-4">
          <AnimatePresence mode="wait" initial={true}>
            <AnimateSharedLayout>
              <Component {...pageProps} key={router.route} />
            </AnimateSharedLayout>
          </AnimatePresence>
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
