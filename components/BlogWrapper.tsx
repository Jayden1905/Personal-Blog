import React from 'react'
import { BlogPost } from '../interfaces/schema'
import BlogCard from './BlogCard'
import { useGlobalContext } from './context/ContextProvider'
import SearchResults from './SearchResults'

type Props = {
  posts: BlogPost[]
}

export default function BlogWrapper ({ posts }: Props) {
  const { useStore } = useGlobalContext()
  const [searchInput] = useStore((store) => store.searchInput)

  // filter posts by search input with title or tags
  const filteredPosts = posts.filter((post) => {
    const title = post.title.toLowerCase()
    const search = searchInput.toLowerCase()

    return title.includes(search)
  })

  return (
    <>
      {searchInput === ''
        ? (
        <div className='grid grid-cols-1 gap-10'>
          {posts.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
          )
        : (
        <SearchResults posts={filteredPosts} />
          )}
    </>
  )
}
