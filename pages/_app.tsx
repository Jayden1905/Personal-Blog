import React from 'react'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import RootLayout from '../components/layout/main'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function MyApp ({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <RootLayout>
        <div className='max-w-5xl h-full mt-28 mx-auto px-4'>
          <AnimatePresence
            mode='wait'
            initial={true}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0 })
              }
            }}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </div>
      </RootLayout>
    </>
  )
}

export default MyApp
