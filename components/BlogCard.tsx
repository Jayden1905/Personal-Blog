import moment from "moment";
import { BlogPost } from "../interfaces/schema";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      scroll={false}
      key={post.id}
      className="p-2 pb-6 last:mb-10 rounded-2xl border-2 dark:border-white border-zinc-900 dark:border-opacity-10 border-opacity-10 group dark:hover:border-opacity-20 hover:border-opacity-20 transition-all duration-200 ease-out"
    >
      <div className="flex flex-col gap-4 group-hover:opacity-60 transition-all duration-200 ease-out">
        <div className="w-full h-80 rounded-xl overflow-hidden">
          <motion.img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover block object-center"
          />
        </div>
        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <div
              key={tag.id}
              className={`p-2 text-sm dark:bg-zinc-700 bg-gray-300 rounded-md`}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <motion.h1 className="text-2xl">{post.title}</motion.h1>
        <p className="dark:text-gray-300">{post.description}</p>
        <p className="text-xs mt-auto dark:text-gray-300">
          {moment(post.date).format("MMM DD, YYYY")}
        </p>
      </div>
    </Link>
  );
}
