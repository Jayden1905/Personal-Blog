import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await res.revalidate('/')

  const pathToRevalidate = `/posts/${
    req.body?.record?.slug || req.body?.old_record?.slug
  }`

  const categoriesPathToRevalidate = '/categories/'

  res.revalidate(categoriesPathToRevalidate)

  res.revalidate(pathToRevalidate)

  return res.send({ revalidate: true })
}

export default handler
