import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await axios.post(
        'https://connect.mailerlite.com/api/subscribers',
        {
          email: req.body.email,
          groups: [process.env.MAILERLITE_GROUP_ID],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MAILERLITE_API_TOKEN}`,
          },
        }
      )

      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ success: false })
    }
  } else {
    res.status(405).end()
  }
}

export default subscribe
