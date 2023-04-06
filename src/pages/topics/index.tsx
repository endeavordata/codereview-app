import * as React from 'react'

import Layout from '@/components/layout/Layout'
import SearchComponent from '@/components/navigation/SearchComponent'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Topics' />
      <main>
        <h1>Here are some topics</h1>
        <div className='p-8'>
          <SearchComponent
            initialResults={['python', 'rust', 'windows', 'css', 'typescript']}
            initialTotalPages={100}
          />
        </div>
      </main>
    </Layout>
  )
}
