import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  await res.revalidate('/')

  return res.send({ revalidate: true })
}

export default handler
