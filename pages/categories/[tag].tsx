import React from 'react'
import { BlogPost } from '../../interfaces/schema'
import NotionService from '../../services/service'
import SearchCategories from '../../components/SerachCategories'
import BlogWrapper from '../../components/BlogWrapper'
import { NoScrollLayout } from '../../components/layout/NoScrollLayout'

type ParamsProps = {
  params: {
    tag: string
  }
}

type Props = {
  posts: BlogPost[]
  tag: string
}

export const getStaticPaths = async () => {
  const notionService = new NotionService()

  const categories = await notionService.getBlogCategories()

  const paths = categories.map((category) => ({
    params: {
      tag: category.toLowerCase()
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { tag } }: ParamsProps) => {
  const notionService = new NotionService()

  const posts = await notionService.getCategoryPosts(capitalize(tag))

  if (!posts) {
    return {
      notFound: true,
      revalidate: 10
    }
  }

  return {
    props: {
      posts,
      tag
    },
    revalidate: 10
  }
}

export function capitalize (str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function CategoryPage ({ posts, tag }: Props) {
  return (
    <NoScrollLayout>
      <SearchCategories posts={posts} slug={tag} />
      <BlogWrapper posts={posts} />
    </NoScrollLayout>
  )
}
