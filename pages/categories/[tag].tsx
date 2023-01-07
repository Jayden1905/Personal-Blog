import React from 'react'
import { GetServerSideProps } from 'next'
import { BlogPost } from '../../interfaces/schema'
import NotionService from '../../services/service'
import SearchCategories from '../../components/SerachCategories'
import BlogWrapper from '../../components/BlogWrapper'
import { NoScrollLayout } from '../../components/layout/NoScrollLayout'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=30'
  )

  const notionService = new NotionService()

  const posts = await notionService.getPublishedBlogPosts()
  const tag = params?.tag

  return {
    props: {
      posts,
      slug: tag
    }
  }
}

type Props = {
  posts: BlogPost[]
  slug: string
}

export function capitalize (str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function CategoryPage ({ posts, slug }: Props) {
  const filterCategoriesPosts = posts.filter((post) =>
    post.tags.some((tag) => tag.name.toLowerCase() === slug.toLowerCase())
  )

  return (
    <NoScrollLayout>
      <SearchCategories posts={filterCategoriesPosts} slug={slug} />
      <BlogWrapper posts={filterCategoriesPosts} />
    </NoScrollLayout>
  )
}
