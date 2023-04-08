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
          <div className='flex flex-col items-center py-12'>
            <div className='text-center'>
              <h1 className='mt-16 text-4xl'>
                Software ecosystems, quantified
              </h1>
              <p className='mt-6 text-xl text-gray-800'>
                Data and insights about software, as it gets created and used.
              </p>
              <p className='mt-1 text-xl text-gray-800'>
                Built with love for technology bettors.
              </p>
            </div>
            <div className='w-full pt-12 pb-8 text-center'>
              <form className='mt-10'>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='w-80 rounded-sm border-0 px-3.5 py-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:leading-6'
                  placeholder='Enter your email'
                />
                <button
                  type='submit'
                  className='text-md mx-4 flex-none rounded-sm bg-orange-400 px-4 py-4 font-semibold text-white shadow-sm hover:bg-orange-500'
                >
                  Subscribe
                </button>
              </form>
            </div>
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
          <div className='mt-12 text-center'>
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
