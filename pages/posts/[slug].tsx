import { GetStaticProps, InferGetStaticPropsType } from "next";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import NotionService from "../../services/service";
import { BlogPost, Tag } from "../../interfaces/schema";
import Layout from "../../components/Layout";
import moment from "moment";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { pageTransition } from "../../animation/motion";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  // @ts-ignore
  const p = await notionService.getSingleBlogPost(context.params?.slug);

  if (!p) {
    throw "";
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
    },
    revalidate: 30,
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  const paths = posts.map((post: BlogPost) => {
    return `/posts/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

const Post = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pb-6 max-w-5xl"
    >
      <Link href={".."} className="flex gap-2 items-center">
        <IoMdArrowRoundBack className="text-xl" role="button" />
        <span>Back</span>
      </Link>
      <div className="mt-10">
        <Layout>
          <Head>
            <title>{post.title}</title>
            <meta
              name={"description"}
              title={"description"}
              content={post.description}
            />
          </Head>
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
            <h1 className="text-4xl">{post.title}</h1>
            <p className="text-md mt-auto dark:text-gray-300">
              {moment(post.date).format("MMMM DD, YYYY")}
            </p>
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full mt-10 mb-20 rounded-xl"
            />
          </div>

          <div className="flex flex-col font-light gap-4 mb-10 text-justify">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </Layout>
      </div>
    </motion.div>
  );
};

export default Post;
