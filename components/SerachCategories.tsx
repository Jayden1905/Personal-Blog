import React, { useState, useRef, useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BlogPost } from '../interfaces/schema'
import { useGlobalContext } from './context/ContextProvider'
import { useOutsideHook } from './Search'
import { capitalize } from '../pages/categories/[tag]'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'

type Props = {
  posts: BlogPost[]
  slug: string
}

export default function SearchCategories({ posts, slug }: Props) {
  const { useStore } = useGlobalContext()
  const [searchInput, setStore] = useStore((store) => store.searchInput)
  const [open, setOpen] = useState(false)

  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const allTags = new Set<string>()
  posts.map((post) => post.tags.map((tag) => allTags.add(tag.name)))

  const resetSearchInput = () => {
    setStore({ searchInput: '' })
  }

  useEffect(() => {
    resetSearchInput()
  }, [open])

  useOutsideHook(divRef, setOpen, open, resetSearchInput)

  const btnClick = () => {
    setOpen((prev) => !prev)
    if (open) {
      resetSearchInput()
    } else {
      inputRef.current?.focus()
    }
  }

  return (
    <div className='mb-10 flex items-center justify-between gap-4'>
      <div className='flex items-center justify-center gap-1'>
        <Link
          href={'/'}
          scroll={false}
          className='cursor-pointer font-normal underline underline-offset-4'
        >
          Index
        </Link>
        <IoIosArrowForward className='text-xl font-extralight opacity-50' />
        <span className='font-extrabold text-orange-500'>
          {capitalize(slug)}
        </span>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <div
          ref={divRef}
          className='relative flex cursor-pointer items-center justify-center'
        >
          <input
            type='text'
            ref={inputRef}
            value={searchInput}
            onChange={(event) => setStore({ searchInput: event.target.value })}
            className={`${
              open ? 'w-32 opacity-100 sm:w-80' : 'w-0 opacity-0'
            } right-0 rounded-full bg-gray-300 px-4 py-1 outline-none transition-all duration-300 ease-out dark:bg-zinc-800 sm:py-2`}
          />
          {!open && (
            <BiSearch
              role={'button'}
              name='search'
              onClick={btnClick}
              className='absolute z-10 text-2xl transition-all duration-300 ease-out'
            />
          )}
        </div>
      </div>
    </div>
  )
}
