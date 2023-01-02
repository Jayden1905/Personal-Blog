import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '../../animation/motion'
import { useScrollRestoration } from './usePreserveScroll'
import { useRouter } from 'next/router'

export const NoScrollLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  useScrollRestoration(router)

  return (
    <motion.div
      className='max-w-3xl h-full mx-auto'
      variants={pageTransition}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.div>
  )
}
