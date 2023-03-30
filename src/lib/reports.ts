import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getReports = async (entity_type: string) => {
  const reports = await prisma.report.findMany({
    where: {
      entity_type,
    },
  })
  return reports
}

export const getReportPaths = async (entity_type: string) => {
  const reports = await getReports(entity_type)
  return reports.map((report) => `/${entity_type}/${report.entity_id}`)
}
