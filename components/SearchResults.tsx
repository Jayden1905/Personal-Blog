import React from 'react'
import { BlogPost } from '../interfaces/schema'
import BlogCard from './BlogCard'
import { useGlobalContext } from './context/ContextProvider'

type Props = {
  posts: BlogPost[]
}

export default function SearchResults ({ posts }: Props) {
  const { useStore } = useGlobalContext()
  const [searchInput] = useStore((store) => store.searchInput)

  return (
    <div className='grid grid-cols-1 gap-10'>
      {searchInput !== ''
        ? posts.map((post) => <BlogCard key={post.id} post={post} />)
        : ''}
    </div>
  )
}
