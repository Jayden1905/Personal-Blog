import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await res.revalidate('/')

  const categoriesPath = `/categories/${
    req.body?.record?.tag || req.body?.old_record?.tag
  }`

  await res.revalidate(categoriesPath)

  return res.send({ revalidate: true })
}

export default handler
