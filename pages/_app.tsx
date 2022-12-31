import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContextProvider from "../components/context/ContextProvider";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ContextProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Nav />
          <div className="max-w-5xl h-full mt-28 mx-auto px-4">
            <AnimatePresence
              mode="wait"
              initial={true}
              onExitComplete={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0 });
                }
              }}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </div>
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
