import * as React from 'react'

import Layout from '@/components/layout/Layout'
import UnderlineLink from '@/components/links/UnderlineLink'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col text-center'>
            <h1 className='mt-16'>Software ecosystems, quantified</h1>
            <p className='mt-6 text-lg text-gray-800'>
              Data and insights about software, as it gets created and used.{' '}
              <br /> Built with love for technology bettors.
            </p>
            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://endeavorlabs.co'>
                Endeavor Labs, LLC
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  )
}
