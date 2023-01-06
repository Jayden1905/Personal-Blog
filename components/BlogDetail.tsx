import React from 'react'
import moment from 'moment'
import { BlogPost, Tag } from '../interfaces/schema'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Layout from './Layout'
import ReactMarkdown from 'react-markdown'
import { useGlobalContext } from './context/ContextProvider'

type Props = {
  post: BlogPost
  markdown: any
}

export default function BlogDetail ({ post, markdown }: Props) {
  const { back } = useGlobalContext()

  return (
    <div>
      <div onClick={back} className='cursor-pointer flex items-center gap-2'>
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
              className='mt-10 mb-20 aspect-auto h-full w-full rounded-xl'
              width={1000}
              height={1000}
              priority
            />
          </div>

          <div className='mb-10 flex flex-col gap-4 text-justify font-light'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </Layout>
      </div>
    </div>
  )
}
