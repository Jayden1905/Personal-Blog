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
import { useEffect } from "react";
import BlogDetail from "../../components/BlogDetail";

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
          <BlogDetail post={post} />

          <div className="flex flex-col font-light gap-4 mb-10 text-justify">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </Layout>
      </div>
    </motion.div>
  );
};

export default Post;
