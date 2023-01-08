import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await res.revalidate('/')

    const categoriesPath = `/categories/${
      req.body?.record?.tag || req.body?.old_record?.tag
    }`
    await res.revalidate(categoriesPath)

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

export default handler
