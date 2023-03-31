import { NextApiRequest, NextApiResponse } from 'next'

export const revalidate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    res.status(401).json({ message: 'Invalid secret' })
  }
  try {
    await res.revalidate(req.query.path as string)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
