import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { BlogPost } from "../interfaces/schema";
import NotionService from "../services/service";
import BlogCard from "../components/BlogCard";

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = "Oddinary's Blog";
  const description = "Welcome to my blog!";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={description}
        />
      </Head>
      <Layout>
        <h1 className="font-bold text-xl my-4 underline underline-offset-8 tracking-wider decoration-zinc-400 dark:decoration-zinc-700 decoration-4 mb-10">
          Blog Posts
        </h1>
        <div className="grid grid-cols-1 gap-10">
          {posts.map((post: BlogPost) => (
            <BlogCard post={post} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
