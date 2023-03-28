import { Prisma, PrismaClient, Topic } from '@prisma/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import * as React from 'react'

import ActiveCommitters from '@/components/cards/ActiveCommitters'
import NewStars from '@/components/cards/NewStars'
import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

type Props = {
  topic: Topic
  content: Prisma.JsonObject
}

const TopicPage = ({ content }: Props) => {
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

export default TopicPage

const prisma = new PrismaClient()

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await prisma.topic.findMany()
  const paths = topics.map((topic) => ({ params: { topic: topic.name } }))
  return { paths, fallback: false }
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
  return { props: { topic, content } }
}
