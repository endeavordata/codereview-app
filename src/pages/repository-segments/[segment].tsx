import { Prisma, PrismaClient, RepositorySegment } from '@prisma/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import * as React from 'react'

import ActiveCommitters from '@/components/cards/ActiveCommitters'
import NewStars from '@/components/cards/NewStars'
import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

type Props = {
  segment: RepositorySegment
  content: Prisma.JsonObject
}

const RepositorySegmentPage = ({ content }: Props) => {
  return (
    <Layout>
      <Seo templateTitle='Report' />
      <main>
        <div className='mx-auto lg:max-w-[90rem]'>
          <div className='fixed hidden w-72 lg:block'>
            <ul>
              <li>
                <Link href='#stargazers'>Stargazers</Link>
              </li>
              <li>
                <Link href='#commit-activity'>Commit activity</Link>
              </li>
            </ul>
          </div>
          <div className='flex flex-col lg:ml-72'>
            <div id='stargazers'>
              <h3>Stargazers</h3>
              <p>Explain chart</p>
              <NewStars data={content} />
            </div>
            <div id='commit-activity'>
              <h3>Commit Activity</h3>
              <ActiveCommitters data={content} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default RepositorySegmentPage

const prisma = new PrismaClient()

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { segment: string }
  const segment = await prisma.repositorySegment.findUnique({
    where: { slug: params.segment },
  })
  const report = await prisma.report.findUnique({
    where: { hightouch_id: `repository_segment:${params.segment}` },
  })
  const content = report?.content as Prisma.JsonObject
  return { props: { segment, content } }
}
