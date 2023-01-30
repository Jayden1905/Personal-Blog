import React, { useRef } from 'react'
import moment from 'moment'
import { BlogPost } from '../interfaces/schema'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useIntersectionObserver from './hooks/useIntersectionObserver'
import { focusAnimation } from '../animation/motion'

type Props = {
  post: BlogPost
}

export default function BlogCard({ post }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting

  return (
    <motion.div
      ref={ref}
      key={post.id}
      variants={focusAnimation}
      initial="hidden"
      animate={`${isVisible ? 'show' : 'hidden'}`}
      className={`blog ${post.id} group rounded-2xl border-2 border-zinc-900 border-opacity-10 p-2 pb-6 transition-all duration-200 ease-out last:mb-12 hover:border-opacity-20 dark:border-white dark:border-opacity-10 dark:hover:border-opacity-20`}
    >
      <Link href={`/posts/${post.slug}`} scroll={false} className="blog">
        <motion.div
          className={
            'blog flex flex-col gap-4 transition-all duration-200 ease-out'
          }
        >
          <motion.div
            layoutId="cover-image"
            className="blog relative h-80 w-full overflow-hidden rounded-xl"
          >
            <Image
              src={post.cover}
              alt={'blog cover image'}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="blog block aspect-auto h-full w-full object-cover object-center"
              priority
            />
          </motion.div>
          <div className="blog flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <div
                key={tag.id}
                className={
                  'blog rounded-md bg-gray-300 p-2 text-sm dark:bg-zinc-700'
                }
              >
                {tag.name}
              </div>
            ))}
          </div>
          <motion.h1 className="blog text-2xl">{post.title}</motion.h1>
          <p className="blog dark:text-gray-300">{post.description}</p>
          <p className="blog mt-auto text-xs dark:text-gray-300">
            {moment(post.date).format('MMM DD, YYYY')}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  )
}
