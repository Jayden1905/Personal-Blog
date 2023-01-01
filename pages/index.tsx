import React from 'react';
import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import NotionService from '../services/service';
import Link from 'next/link';
import Search from '../components/Search';
import BlogWrapper from '../components/BlogWrapper';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
};

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'Oddinary\'s Blog';
  const description = 'Welcome to my blog!';
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
      <Layout>
        <Search posts={posts} />
        <BlogWrapper posts={posts} />
        <div>
          <h1 className='font-bold text-xl mb-10 underline underline-offset-8 tracking-wider decoration-zinc-400 dark:decoration-zinc-700 decoration-4'>
            Created With
          </h1>
          <div className='grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4'>
            <Link href={'https://nextjs.org/'} target='_blank'>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <div className='w-full sm:h-52 h-64 relative'>
                  <Image
                    src='https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png'
                    alt='nextjs'
                    fill
                    className='h-full w-full rounded-2xl'
                    sizes='(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw'
                    placeholder='blur'
                    blurDataURL='https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png'
                    priority
                  />
                </div>
                <h1 className='text-xl font-normal'>Next Js</h1>
                <p className='font-light text-md'>
                  Frame Work for building full-stack websites
                </p>
              </div>
            </Link>
            <Link href={'https://www.notion.so/'} target='_blank'>
              <div className='flex flex-col gap-2 justify-center items-center'>
                <div className='w-full sm:h-52 h-64 relative'>
                  <Image
                    src='https://www.notion.so/front-static/meta/default.png'
                    alt='notion'
                    className='h-full w-full rounded-2xl'
                    fill
                    sizes='(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw'
                    placeholder='blur'
                    blurDataURL='https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png'
                    priority
                  />
                </div>
                <h1 className='text-xl font-normal'>Notion</h1>
                <p className='font-light text-md'>Note taking app for CMS</p>
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
