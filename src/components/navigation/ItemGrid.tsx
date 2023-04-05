import Link from 'next/link'
import * as React from 'react'

type Props = {
  items: string[]
}

const ItemGrid = ({ items }: Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
      {items.map((item) => {
        return (
          <div key={`item_${item}`} className='m-2'>
            <Link
              href={`/topics/${item}`}
              className='inline-flex rounded-full bg-blue-100 px-2 text-sm font-semibold leading-6 text-gray-800 hover:bg-blue-200'
            >
              {item}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default ItemGrid
