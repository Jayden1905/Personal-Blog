import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  PreviewData,
} from "next";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import NotionService from "../../services/service";
import { BlogPost } from "../../interfaces/schema";
import Layout from "../../components/Layout";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { pageTransition } from "../../animation/motion";
import BlogDetail from "../../components/BlogDetail";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData> | any
) => {
  const notionService = new NotionService();

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
  const router = useRouter();

  useEffect(() => {
    router?.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  });

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-5xl pb-6"
    >
      <div
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2"
      >
        <IoMdArrowRoundBack className="text-xl" role="button" />
        <span>Back</span>
      </div>
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

          <div className="mb-10 flex flex-col gap-4 text-justify font-light">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </Layout>
      </div>
    </motion.div>
  );
};

export default Post;
