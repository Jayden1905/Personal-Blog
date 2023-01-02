import React from 'react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  PreviewData
} from 'next'
import Head from 'next/head'
import NotionService from '../../services/service'
import { motion } from 'framer-motion'
import { pageTransition } from '../../animation/motion'
import BlogDetail from '../../components/BlogDetail'
import { ParsedUrlQuery } from 'querystring'
import { BlogPost } from '../../interfaces/schema'

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData> | any
) => {
  const notionService = new NotionService()

  const p = await notionService.getSingleBlogPost(context.params?.slug)

  if (!p) {
    throw new Error()
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post
    },
    revalidate: 30
  }
}

export async function getStaticPaths () {
  const notionService = new NotionService()

  const posts = await notionService.getPublishedBlogPosts()

  const paths = posts.map((post: BlogPost) => {
    return `/posts/${post.slug}`
  })

  return {
    paths,
    fallback: false
  }
}

const Post = ({
  markdown,
  post
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <motion.div
      variants={pageTransition}
      initial='initial'
      animate='animate'
      exit='exit'
      className='max-w-5xl pb-6'
    >
      <Head>
        <title>{post.title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={post.description}
        />
      </Head>
      <BlogDetail post={post} markdown={markdown} />
    </motion.div>
  )
}

export default Post
