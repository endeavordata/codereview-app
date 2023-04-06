import { GetStaticProps } from 'next'
import * as React from 'react'

import Layout from '@/components/layout/Layout'
import SearchComponent from '@/components/navigation/SearchComponent'
import Seo from '@/components/Seo'

interface TopicPageProps {
  topics: string[]
  totalPages: number
}

const TopicsPage = ({ topics, totalPages }: TopicPageProps) => {
  return (
    <Layout>
      <Seo templateTitle='Topics' />
      <main>
        <h1>Here are some topics</h1>
        <div className='p-8'>
          <SearchComponent
            initialResults={topics}
            initialTotalPages={totalPages}
          />
        </div>
      </main>
    </Layout>
  )
}

export default TopicsPage

export const getStaticProps: GetStaticProps = async () => {
  const url = `${process.env.HOST_URL}/api/search/topics`
  const response = await fetch(url).then((res) => res.json())
  const topics = response.topics.map(
    (topic: Record<string, string>) => topic.name
  )
  const totalPages = response.pagination.total_pages
  return {
    props: { topics, totalPages },
    revalidate: 60 * 60 * 24, // no more than daily
  }
}
