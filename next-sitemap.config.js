import { getReportPaths } from '@/lib/reports'

/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  additionalPaths: async () => {
    const paths = await getReportPaths()
    return paths.map((path) => ({ loc: path }))
  },
  siteUrl: 'https://thecodereview.fyi',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
