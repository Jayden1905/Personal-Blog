import React, { ReactNode } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import Nav from '../Nav'
import Footer from '../Footer'
import ContextProvider from '../context/ContextProvider'

function RootLayout ({ children }: { children: ReactNode }) {
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

        <link rel="icon" href="/favicon.ico" />
        <title>Oddinary&apos;s Blog</title>
      </Head>

      <ContextProvider>
        <ThemeProvider enableSystem attribute="class">
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </div>
  )
}

export default RootLayout
