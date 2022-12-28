import moment from "moment";
import { BlogPost, Tag } from "../interfaces/schema";
import { motion } from "framer-motion";

type Props = {
  post: BlogPost;
};

export default function BlogDetail({ post }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex gap-2">
        {post.tags.map((tag: Tag) => (
          <div
            key={tag.id}
            className={`p-2 text-sm dark:bg-zinc-700 bg-gray-300 rounded-md`}
          >
            {tag.name}
          </div>
        ))}
      </div>
      <motion.h1 className="text-4xl">{post.title}</motion.h1>
      <p className="text-md mt-auto dark:text-gray-300">
        {moment(post.date).format("MMMM DD, YYYY")}
      </p>
      <motion.img
        src={post.cover}
        alt={post.title}
        className="w-full h-full mt-10 mb-20 rounded-xl"
      />
    </div>
  );
}
