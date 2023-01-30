import React from 'react'
import type { AppProps } from 'next/app'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import RootLayout from '../components/layout/main'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <RootLayout>
        <div className="mx-auto mt-28 h-full max-w-5xl px-4">
          <AnimateSharedLayout>
            <AnimatePresence
              mode="wait"
              initial={true}
              onExitComplete={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0 })
                }
              }}
            >
              <Component {...pageProps} key={router.route} />
              <Analytics />
            </AnimatePresence>
          </AnimateSharedLayout>
        </div>
      </RootLayout>
    </>
  )
}

export default MyApp
