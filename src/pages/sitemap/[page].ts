import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

import { URLS_PER_SITEMAP } from '../../lib/sitemap'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as { page: string }
  const page = Number(params.page)
  const reports = await prisma.report.findMany({
    skip: (page - 1) * URLS_PER_SITEMAP,
    take: URLS_PER_SITEMAP,
  })
  const items = reports.map((report) => ({
    loc: `${process.env.HOST_URL}/${report.entity_type}/${report.entity_id}`,
    lastmod: (report.updated_at || report.created_at).toISOString(),
  }))
  const cacheMaxAge = 24 * 60 * 60 // 1 day
  const cacheStaleWhileRevalidate = 72 * 60 * 60 // 3 days
  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}}`
  )
  return getServerSideSitemap(context, items)
}

export default function SitemapPage() {}
