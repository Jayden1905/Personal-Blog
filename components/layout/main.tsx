import React, { ReactNode } from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import Nav from '../Nav'
import Footer from '../Footer'
import ContextProvider from '../context/ContextProvider'
import { IBM_Plex_Sans } from '@next/font/google'

const ibm = IBM_Plex_Sans({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
})

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={ibm.className}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content="Oddinary's Blog" />
        <meta name='author' content='Kyaw Za Yan Naing' />
        <meta name='author' content='Oddinary' />
        <meta property='og:title' content="Oddinary's Blog" />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://oddinary.vercel.app/' />
        <meta
          property='og:image'
          content='https://oddinary.vercel.app/images/oddinary.png'
        />
        <meta property='og:description' content="Oddinary's Blog" />
        <meta property='og:site_name' content="Oddinary's Blog" />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <title>Oddinary&apos;s Blog</title>
      </Head>

      <ContextProvider>
        <ThemeProvider enableSystem attribute='class'>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </div>
  )
}

export default RootLayout
