import { PrismaClient } from '@prisma/client'
import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'The Code Review' })

const prisma = new PrismaClient()

const generateStaticPages = inngest.createFunction(
  { name: 'Generate static pages' },
  { event: 'app/generateStaticPages' },
  async ({ event, step }) => {
    const batchSize = 5000
    const totalBatches = await prisma.report.count()
    let i = 0
    while (i < totalBatches) {
      await step.run(
        `Static page batch (${i + 1} of ${totalBatches})`,
        async () => {
          const reports = await prisma.report.findMany({
            skip: i * batchSize,
            take: batchSize,
          })
          for (const report of reports) {
            const path = `/${report.entity_type}/${report.entity_id}`
            const url = `${process.env.HOST_URL}/api/revalidate?path=${path}&secret=${process.env.REVALIDATE_SECRET}`
            try {
              await fetch(url)
            } catch (error) {}
          }
        }
      )
      i += 1
    }
    return { event, body: `Done` }
  }
)

export default serve(inngest, [generateStaticPages])
