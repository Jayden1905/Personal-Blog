import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.revalidate('/')

  const pathToRevalidate = `/posts/${
    req.body?.record?.slug || req.body?.old_record?.slug
  }`

  const categoriesPath = `/categories/${
    req.body?.record?.category || req.body?.old_record?.category
  }`

  res.revalidate(categoriesPath)

  res.revalidate(pathToRevalidate)

  return res.send({ revalidate: true })
}

export default handler
