import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FiSun } from 'react-icons/fi'
import { RiMoonFill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'

const ThemeToggleButton = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if (!mounted) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      return (
        <button
          aria-label='theme-toggle-button-light'
          name='light-mode'
          className='rounded-md p-3 font-extrabold text-lg bg-orange-200 hover:bg-orange-300 text-black transition-all duration-200 ease-out'
          onClick={() => setTheme('light')}
        >
          <FiSun name='sun' className='w-5 h-5' role='button' />
        </button>
      )
    } else {
      return (
        <button
          aria-label='theme-toggle-button-dark'
          name='dark-mode'
          className='rounded-md p-3 font-extrabold text-lg bg-violet-600 hover:bg-violet-700 text-white transition-all duration-200 ease-out'
          onClick={() => setTheme('dark')}
        >
          <RiMoonFill name='moon' className='w-5 h-5' role='button' />
        </button>
      )
    }
  }

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderThemeChanger()}
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemeToggleButton
