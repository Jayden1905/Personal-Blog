import React, { useState, useRef, useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BlogPost } from '../interfaces/schema'
import Categories from './Categories'
import { useGlobalContext } from './context/ContextProvider'

export function useOutsideHook(
  ref: any,
  setOpen: (value: boolean) => void,
  open: boolean,
  resetFunction: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.classList.contains('blog')
      ) {
        setOpen(false)
        if (!open) {
          resetFunction()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

type Props = {
  posts: BlogPost[]
}

export default function Search({ posts }: Props) {
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
      <div>
        <h1 className='my-4 text-xl font-bold tracking-wider underline decoration-zinc-400 decoration-4 underline-offset-8 dark:decoration-zinc-700'>
          {searchInput === '' ? 'Blog Posts' : 'Results'}
        </h1>
      </div>
      <div className='flex gap-4'>
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
        <Categories tags={Array.from(allTags)} />
      </div>
    </div>
  )
}
