import moment from "moment";
import { BlogPost } from "../interfaces/schema";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      scroll={false}
      key={post.id}
      id="blog-post"
      className="blog p-2 pb-6 last:mb-12 rounded-2xl border-2 dark:border-white border-zinc-900 dark:border-opacity-10 border-opacity-10 group dark:hover:border-opacity-20 hover:border-opacity-20 transition-all duration-200 ease-out"
    >
      <div className="blog flex flex-col gap-4 group-hover:opacity-60 transition-all duration-200 ease-out">
        <div className="blog w-full h-80 rounded-xl overflow-hidden relative">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="blog w-full h-full object-cover block object-center"
            placeholder="blur"
            blurDataURL={post.cover}
            priority={true}
          />
        </div>
        <div className="blog flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <div
              key={tag.id}
              className={`blog p-2 text-sm dark:bg-zinc-700 bg-gray-300 rounded-md`}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <motion.h1 className="blog text-2xl">{post.title}</motion.h1>
        <p className="blog dark:text-gray-300">{post.description}</p>
        <p className="blog text-xs mt-auto dark:text-gray-300">
          {moment(post.date).format("MMM DD, YYYY")}
        </p>
      </div>
    </Link>
  );
}
