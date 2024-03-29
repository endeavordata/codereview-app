import { GetStaticProps } from 'next'
import * as React from 'react'

import EmailSubscribeForm from '@/components/EmailSubscribeForm'
import Layout from '@/components/layout/Layout'
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
          <div className='flex flex-col items-center py-12'>
            <div className='whitespace-break-spaces px-16 text-center'>
              <h1 className='mt-16 text-4xl'>
                Software ecosystems, quantified
              </h1>
              <p className='mt-6 text-xl text-gray-800'>
                <span className='inline text-xl md:block'>
                  Data and insights about software, as it gets created and used.{' '}
                </span>
                <span className='text-xl'>
                  Built with love for technology bettors.
                </span>
              </p>
            </div>
            <div className='mt-16 mb-10 w-full text-center'>
              <EmailSubscribeForm />
            </div>
          </div>
        </section>
        <section>
          <div className='mt-4 flex flex-col items-center p-8'>
            <div className='w-full max-w-5xl xl:max-w-7xl'>
              <SearchComponent
                initialResults={topics}
                initialTotalPages={totalPages}
              />
            </div>
          </div>
        </section>

        <section className='bg-white'>
          <div className='mt-16 text-center'>
            <p className='mb-2 text-2xl italic'>
              The Code Review was built by technology bettors, for technology
              bettors.
            </p>
          </div>
          <div className='flex flex-col items-center justify-center space-x-8 space-y-16 py-12 px-6 xl:flex-row'>
            <div className='max-w-2xl rounded-2xl bg-gray-100 py-12 pl-12 pr-10 shadow-lg xl:max-w-xl'>
              <h2 className='mb-1 text-2xl font-bold'>technology bettor</h2>
              <p className='mb-1 text-lg text-gray-800'>
                <em>/təkˈnäləjē ˈbetər/</em>
              </p>
              <p className='mb-2 text-lg font-semibold text-gray-800'>
                <em>noun</em>
              </p>
              <ol className='list-inside list-decimal text-gray-800'>
                <li className='mb-2 text-lg'>
                  A person responsible for making decisions informed by an
                  up-to-date understanding of software industry trends.
                </li>
                <li className='mb-2 text-lg'>
                  Anyone who risks time or money based on the future popularity
                  of a particular software-related technology.
                </li>
              </ol>
            </div>
            <div className='max-w-2xl px-4 pb-6 xl:max-w-xl'>
              <p className='mb-6 text-center text-2xl italic'>
                You might be a{' '}
                <span className='font-semibold'>technology bettor</span> if
                you're...
              </p>
              <div className='pl-8 md:pl-12'>
                <ul className='list-outside list-disc'>
                  <li className='mb-4 text-lg'>
                    An <span className='font-semibold'>engineer</span> trying
                    decide what tools are worth learning or using in your stack.
                  </li>
                  <li className='mb-4 text-lg'>
                    An <span className='font-semibold'>investor</span> looking
                    to get data-driven about the developer infrastructure and
                    commercial open source space.
                  </li>
                  <li className='mb-4 text-lg'>
                    A <span className='font-semibold'>developer marketer</span>{' '}
                    or <span className='font-semibold'>product manager</span>{' '}
                    tring to stay on top of trends that affect your customers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
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
