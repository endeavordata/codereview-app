import { Inngest } from 'inngest'
import { NextApiRequest, NextApiResponse } from 'next'

const inngest = new Inngest({ name: 'The Code Review' })

export const revalidateAll = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    res.status(401).json({ message: 'Invalid secret' })
  }
  await inngest.send({
    name: 'app/generateStaticPages',
    data: {},
  })
}
