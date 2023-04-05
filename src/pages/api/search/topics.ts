import { NextApiRequest, NextApiResponse } from 'next'

import typesense from '@/lib/typesense'
import { getQueryParameter } from '@/lib/utils'

const searchTopics = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageSize = Math.min(Number(req.query.size || 25), 1000)
  const currentPage = Number(req.query.page) || 1

  const topics = await typesense
    .collections('topics')
    .documents()
    .search({
      q: getQueryParameter(req.query.q) || '*',
      query_by: 'name',
      infix: 'always',
      per_page: pageSize,
      page: currentPage,
    })
  const topicsPayload = topics.hits?.map((hit) => hit.document) || []
  const totalTopics = topics.found
  const totalPages = Math.ceil(totalTopics / pageSize)

  return res.json({
    topics: topicsPayload,
    pagination: {
      current_page: currentPage,
      total_pages: totalPages,
    },
  })
}

export default searchTopics
