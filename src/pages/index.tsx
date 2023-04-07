import { GetStaticProps } from 'next'
import * as React from 'react'

import Layout from '@/components/layout/Layout'
import UnderlineLink from '@/components/links/UnderlineLink'
import SearchComponent from '@/components/navigation/SearchComponent'
import Seo from '@/components/Seo'

interface HomePageProps {
  topics: string[]
  totalPages: number
}

const HomePage = ({ topics, totalPages }: HomePageProps) => {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-orange-100'>
          <div className='layout relative flex flex-col py-12 text-center'>
            <h1 className='mt-16'>Software ecosystems, quantified</h1>
            <p className='mt-6 text-lg text-gray-800'>
              Data and insights about software, as it gets created and used.{' '}
              <br /> Built with love for technology bettors.
            </p>
          </div>
        </section>
        <section>
          <div className='p-8'>
            <SearchComponent
              initialResults={topics}
              initialTotalPages={totalPages}
            />
          </div>
        </section>
        <section className='bg-white'>
          <div className='layout flex flex-wrap py-12'>
            <div className='w-full md:w-1/2'>
              <h2 className='mb-1 text-xl font-bold'>Technology Bettor</h2>
              <p className='mb-1 text-lg text-gray-800'>
                <em>/təkˈnäləjē ˈbetər/</em>
              </p>
              <p className='mb-2 text-lg text-gray-800'>
                <em>noun</em>
              </p>
              <ol className='list-inside list-decimal text-gray-800'>
                <li>
                  A person responsible for making decisions informed by an
                  up-to-date understanding of software industry trends.
                </li>
                <li>
                  Anyone who risks time or money based on the future popularity
                  of a particular software-related technology.
                </li>
              </ol>
            </div>
            <div className='w-full md:w-1/2'>
              <p className='mb-2 text-lg font-bold'>
                The CodeReview is for technology bettors like you:
              </p>
              <ol className='list-inside list-decimal text-gray-800'>
                <li>
                  Engineering leaders: Gain insights into the latest tools and
                  technologies to help your team stay at the cutting edge.
                </li>
                <li>
                  Developer marketers: Understand industry trends to better
                  target your messaging and engage your audience.
                </li>
                <li>
                  Technology investors: Make informed investments based on
                  data-driven insights into technology adoption and growth.
                </li>
                <li>
                  Developer- product managers: Identify opportunities and
                  prioritize features based on industry-wide trends and
                  competitor analysis.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <footer className='bg-white py-6'>
          <div className='layout text-center text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://endeavorlabs.co'>
              Endeavor Labs, LLC
            </UnderlineLink>
          </div>
        </footer>
      </main>
    </Layout>
  )
}

export default HomePage

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
