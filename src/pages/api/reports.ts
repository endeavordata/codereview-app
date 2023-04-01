import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const listReports = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageSize = 100 // Hardcoded for now
  const totalReports = await prisma.report.count()
  const totalPages = Math.ceil(totalReports / pageSize)
  const currentPage = Number(req.query.page) || 1

  const reports = await prisma.report.findMany({
    where: { entity_type: 'topic' }, // Hardcoded for now
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })
  const reportsPayload = reports.map((report) => {
    return {
      entity_type: report.entity_type,
      entity_id: report.entity_id,
      created_at: report.created_at.toISOString(),
      updated_at: (report.updated_at || report.created_at).toISOString(),
    }
  })

  return res.json({
    reports: reportsPayload,
    pagination: {
      current_page: currentPage,
      total_pages: totalPages,
    },
  })
}

export default listReports
