import React from 'react';
import {GetStaticProps} from 'next';
import Layout from '../../components/Layout';
import {BlogPost} from '../../interfaces/schema';
import NotionService from '../../services/service';
import SearchCategories from '../../components/SerachCategories';
import BlogWrapper from '../../components/BlogWrapper';

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

export function capitalize(str: string) {
  return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

export default function CategoryPage({posts, slug}: Props): JSX.Element {
  const filterCategoriesPosts = posts.filter((post) =>
    post.tags.some((tag) => tag.name.toLowerCase() === slug.toLowerCase()),
  );

  return (
    <Layout>
      <SearchCategories posts={filterCategoriesPosts} slug={slug} />
      <BlogWrapper posts={filterCategoriesPosts} />
    </Layout>
  );
}
