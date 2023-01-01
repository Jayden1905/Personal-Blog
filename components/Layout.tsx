import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '../animation/motion'

export default function Layout ({ children }: { children: ReactNode }) {
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
