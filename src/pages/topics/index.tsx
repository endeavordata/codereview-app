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
          {/* <ItemGrid items={[
            'python', 'that', 'fish', 'red', 'very', 'stury', 'pumpkin', 'just',
            'server', 'nine', 'coupons', 'planet', 'solar', 'system', 'earth',
            'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
            'corona', 'miller', 'coors', 'bud-light', 'heineken', 'yellow', 'css',
            'green', 'blue', 'red', 'orange', 'purple', 'black', 'white', 'grey',
            'brown', 'shapes', 'gold', 'silver', 'bronze', 'copper', 'aluminum',
            'steel', 'iron', 'magnesium', 'titanium', 'tungsten', 'platinum',
            'apple', 'orange', 'exchange', 'grape', 'strawberry', 'blueberry',
          ]} /> */}
          <SearchComponent />
        </div>
      </main>
    </Layout>
  )
}
