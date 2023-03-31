import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getServerSideSitemapIndex } from 'next-sitemap'

import { URLS_PER_SITEMAP } from '../../lib/sitemap'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageCount = await prisma.report.count()
  const sitemapCount = Math.ceil(pageCount / URLS_PER_SITEMAP)
  const sitemaps = Array(sitemapCount)
    .fill('')
    .map((_, idx) => `${process.env.HOST_URL}/sitemap-${idx + 1}.xml`)
  return getServerSideSitemapIndex(context, sitemaps)
}

export default function SitemapIndex() {}
