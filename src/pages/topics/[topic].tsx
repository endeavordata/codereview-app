import { Prisma, PrismaClient, Topic } from '@prisma/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'

import { generateIdFromName } from '@/lib/utils'

import ActiveCommitters from '@/components/cards/ActiveCommitters'
import IssueUsers from '@/components/cards/IssueUsers'
import NewStars from '@/components/cards/NewStars'
import Layout from '@/components/layout/Layout'
import TableOfContents from '@/components/navigation/TableOfContents'
import Seo from '@/components/Seo'

type Props = {
  topic: Topic
  content: Prisma.JsonObject
}

const sections = [
  { name: 'Stargazers', card: NewStars },
  { name: 'Commit Activity', card: ActiveCommitters },
  { name: 'Issue Activity', card: IssueUsers },
]

const TopicPage = ({ content }: Props) => {
  return (
    <Layout>
      <Seo templateTitle='Report' />
      <main>
        <div className='mx-auto lg:max-w-[90rem]'>
          <div className='text-md fixed hidden w-64 py-16 pl-6 lg:block'>
            <TableOfContents
              sections={sections.map((section) => section.name)}
            />
          </div>
          <div className='flex flex-col space-y-2 md:space-y-4 lg:ml-64'>
            {sections.map((section) => (
              <div
                id={generateIdFromName(section.name)}
                key={generateIdFromName(section.name)}
                className='p-4 md:p-8'
              >
                <h3>{section.name}</h3>
                <section.card data={content} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default TopicPage

const prisma = new PrismaClient()

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { topic: string }
  const topic = await prisma.topic.findUnique({
    where: { name: params.topic },
  })
  const report = await prisma.report.findUnique({
    where: { hightouch_id: `topic:${params.topic}` },
  })
  const content = report?.content as Prisma.JsonObject
  return {
    props: { topic, content },
    revalidate: 60 * 60 * 24 * 7, // no more than weekly
  }
}
