import React from 'react'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import NotionService from '../services/service'
import Link from 'next/link'
import Search from '../components/Search'
import BlogWrapper from '../components/BlogWrapper'
import Image from 'next/image'
import { NoScrollLayout } from '../components/layout/NoScrollLayout'

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService()

  const posts = await notionService.getPublishedBlogPosts()

  return {
    props: {
      posts
    },
    revalidate: 10
  }
}

const Home: NextPage = ({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = "Oddinary's Blog"
  const description = 'Welcome to my blog!'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={'description'}
          title={'description'}
          content={description}
        />
      </Head>
      <NoScrollLayout>
        <Search posts={posts} />
        <BlogWrapper posts={posts} />
        <div>
          <h1 className='mb-10 text-xl font-bold tracking-wider underline decoration-zinc-400 decoration-4 underline-offset-8 dark:decoration-zinc-700'>
            Created With
          </h1>
          <div className='mb-6 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-4'>
            <Link href={'https://nextjs.org/'} target='_blank'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='relative h-64 w-full sm:h-52'>
                  <Image
                    src='https://miro.medium.com/max/1400/1*2tmzU7bve-VlTkOMWsk_Hw.jpeg'
                    alt='nextjs'
                    fill
                    className='h-full w-full rounded-2xl object-cover object-center'
                    sizes='(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw'
                    placeholder='blur'
                    blurDataURL='https://miro.medium.com/max/1400/1*2tmzU7bve-VlTkOMWsk_Hw.jpeg'
                    priority={true}
                  />
                </div>
                <h1 className='text-xl font-normal'>Next JS</h1>
                <p className='text-md font-extralight'>
                  Frame Work for building full-stack websites
                </p>
              </div>
            </Link>
            <Link href={'https://www.notion.so/'} target='_blank'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='relative h-64 w-full rounded-2xl bg-gray-200 sm:h-52'>
                  <Image
                    src='https://itbabble.files.wordpress.com/2021/11/notion.png'
                    alt='notion'
                    className='h-full w-full rounded-2xl object-cover object-center'
                    fill
                    sizes='(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw'
                    placeholder='blur'
                    blurDataURL='https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png'
                    priority={true}
                  />
                </div>
                <h1 className='text-xl font-normal'>Notion</h1>
                <p className='text-md font-extralight'>
                  A note-taking application for CMS
                </p>
              </div>
            </Link>
          </div>
        </div>
      </NoScrollLayout>
    </>
  )
}

export default Home
