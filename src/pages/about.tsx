import * as React from 'react'

import Layout from '@/components/layout/Layout'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='About' />
      <main>
        <h1>About</h1>
      </main>
    </Layout>
  )
}
