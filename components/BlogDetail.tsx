import React from 'react'
import moment from 'moment'
import { BlogPost, Tag } from '../interfaces/schema'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Layout from './Layout'
import { useGlobalContext } from './context/ContextProvider'
import Markdown from 'markdown-to-jsx'
import Code from './Code'
import BlogCard from './BlogCard'

type Props = {
  post: BlogPost
  markdown: any
  continueReadingPosts: BlogPost[]
}

export default function BlogDetail({
  post,
  markdown,
  continueReadingPosts,
}: Props) {
  const { back } = useGlobalContext()

  return (
    <div>
      <div onClick={back} className='flex cursor-pointer items-center gap-2'>
        <IoMdArrowRoundBack className='text-xl' role='button' />
        <span>Back</span>
      </div>
      <div className='mt-10'>
        <Layout>
          <div className='mb-4 flex flex-col gap-4'>
            <div className='flex gap-2'>
              {post.tags.map((tag: Tag) => (
                <div
                  key={tag.id}
                  className={
                    'rounded-md bg-gray-300 p-2 text-sm dark:bg-zinc-700'
                  }
                >
                  {tag.name}
                </div>
              ))}
            </div>
            <motion.h1 className='text-4xl'>{post.title}</motion.h1>
            <p className='text-md mt-auto dark:text-gray-300'>
              {moment(post.date).format('MMMM DD, YYYY')}
            </p>
            <Image
              src={post.cover}
              alt={'blog cover image'}
              className='mt-10 mb-16 aspect-auto h-full w-full rounded-xl'
              width={1000}
              height={1000}
              priority
            />
          </div>
          <div className='prose m-0 mx-auto max-w-4xl p-0 leading-7 tracking-wide dark:prose-invert'>
            <Markdown
              options={{
                overrides: {
                  code: {
                    component: Code,
                  },
                },
              }}
            >
              {markdown}
            </Markdown>
          </div>
          <div className='mt-10'>
            <h1 className='mb-10 text-2xl font-bold tracking-wider underline decoration-zinc-400 decoration-4 underline-offset-8 dark:decoration-zinc-700'>
              Continue Readings
            </h1>
            <div className='grid grid-cols-1 gap-10'>
              {continueReadingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </Layout>
      </div>
    </div>
  )
}
