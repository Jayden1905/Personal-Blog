import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' scroll={false} className='font-bold text-2xl mr-2'>
      Oddinary&apos;s Blog
    </Link>
  )
}

export default Logo
