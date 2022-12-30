import { GetStaticProps } from "next";
import { IoMdArrowRoundBack, IoIosArrowForward } from "react-icons/io";
import BlogCard from "../../components/BlogCard";
import Layout from "../../components/Layout";
import { BlogPost } from "../../interfaces/schema";
import NotionService from "../../services/service";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();
  const tag = context.params?.tag;

  return {
    props: {
      posts,
      slug: tag,
    },
    revalidate: 30,
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPublishedBlogPosts();
  const allTags = new Set<string>();
  posts.map((post) => post.tags.map((tag) => allTags.add(tag.name)));

  const paths = Array.from(allTags).map((tag) => {
    return `/categories/${tag.toLowerCase()}`;
  });

  return {
    paths,
    fallback: false,
  };
}

type Props = {
  posts: BlogPost[];
  slug: string;
};

export default function CategoryPage({ posts, slug }: Props): JSX.Element {
  const filterCategoriesPosts = posts.filter((post) =>
    post.tags.some((tag) => tag.name.toLowerCase() === slug.toLowerCase())
  );

  function capitalize(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  console.log(slug, filterCategoriesPosts);
  return (
    <Layout>
      <div className="flex gap-1 items-center mb-10">
        <Link
          href={".."}
          className="underline underline-offset-4 font-extralight"
        >
          Index
        </Link>
        <IoIosArrowForward className="text-xl font-extralight opacity-50" />
        <span className="font-extrabold text-orange-500">
          {capitalize(slug)}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-10">
        {filterCategoriesPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
}
