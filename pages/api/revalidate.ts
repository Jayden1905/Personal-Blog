import type { NextApiRequest, NextApiResponse } from 'next'

export const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  await res.revalidate('/')
  await res.revalidate('/posts')

  return res.send({ revalidate: true })
}
