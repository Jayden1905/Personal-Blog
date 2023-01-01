import React from 'react';
import moment from 'moment';
import {BlogPost, Tag} from '../interfaces/schema';
import {motion} from 'framer-motion';
import Image from 'next/image';

type Props = {
  post: BlogPost;
};

export default function BlogDetail({post}: Props) {
  return (
    <div className='mb-4 flex flex-col gap-4'>
      <div className='flex gap-2'>
        {post.tags.map((tag: Tag) => (
          <div
            key={tag.id}
            className={`rounded-md bg-gray-300 p-2 text-sm dark:bg-zinc-700`}
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
        alt={post.title}
        className='mt-10 mb-20 aspect-auto h-full w-full rounded-xl'
        width={1000}
        height={1000}
        placeholder='blur'
        blurDataURL={post.cover}
        priority={true}
      />
    </div>
  );
}
