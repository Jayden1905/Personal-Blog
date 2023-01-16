import { Client } from '@notionhq/client'
import { BlogPost, PostPage } from '../interfaces/schema'
import { NotionToMarkdown } from 'notion-to-md'

export default class NotionService {
  client: Client
  n2m: NotionToMarkdown

  constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
    this.n2m = new NotionToMarkdown({ notionClient: this.client })
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? ''
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: 'Publish',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Publish',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })
  }

  async getBlogCategories(): Promise<string[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? ''
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: 'Publish',
        checkbox: {
          equals: true,
        },
      },
    })

    const posts = response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })

    const categories = posts.map((post) => {
      return post.tags.map((tag) => tag.name)
    })

    const uniqueCategories = new Set(categories.flat())

    return Array.from(uniqueCategories)
  }

  async getCategoryPosts(category: string): Promise<BlogPost[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? ''
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        and: [
          {
            property: 'Publish',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Tags',
            multi_select: {
              contains: category,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Publish',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })
  }

  async getSingleBlogPost(slug: string): Promise<PostPage> {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? ''

    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    })

    if (!response.results[0]) {
      throw new Error('No results available.')
    }

    const page = response.results[0]

    const mdBlogs = await this.n2m.pageToMarkdown(page.id)
    const markdown = this.n2m.toMarkdownString(mdBlogs)
    const post = NotionService.pageToPostTransformer(page)

    return {
      post,
      markdown,
    }
  }

  async getSlugs(): Promise<string[]> {
    const database = process.env.NOTION_BLOG_DATABASE_ID ?? ''
    const response = await this.client.databases.query({
      database_id: database,
      filter: {
        property: 'Publish',
        checkbox: {
          equals: true,
        },
      },
    })

    const posts = response.results.map((res) => {
      return NotionService.pageToPostTransformer(res)
    })

    return posts.map((post) => post.slug)
  }

  private static pageToPostTransformer(page: any): BlogPost {
    let cover = page.cover
    switch (cover.type) {
      case 'file':
        cover = page.cover.file
        break
      case 'external':
        cover = page.cover.external.url
        break
      default:
        cover = ''
    }

    return {
      id: page.id,
      cover,
      title: page.properties.Name.title[0].plain_text,
      tags: page.properties.Tags.multi_select,
      description: page.properties.Description.rich_text[0].plain_text,
      date: page.properties.Update.last_edited_time,
      slug: page.properties.Slug.formula.string,
    }
  }
}
