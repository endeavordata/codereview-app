import Link from 'next/link'

interface ResultListProps {
  results: string[]
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
}

export function ResultList({
  results,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: ResultListProps) {
  return (
    <div className='flex flex-col space-y-8'>
      <div className='grid grid-cols-2 pl-16 sm:pl-32 md:grid-cols-3 xl:grid-cols-4'>
        {results.map((result) => {
          return (
            <div key={`item_${result}`} className='m-2'>
              <Link
                href={`/topics/${result}`}
                className='inline-flex rounded-full bg-blue-100 px-2 text-sm font-semibold leading-6 text-gray-800 hover:bg-blue-200'
              >
                {result}
              </Link>
            </div>
          )
        })}
      </div>
      <div className='text-center'>
        <button
          disabled={currentPage === 1}
          onClick={onPrevPage}
          className='inline-flex items-center px-8 hover:text-gray-600 disabled:text-gray-500'
        >
          &larr; Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={onNextPage}
          className='inline-flex items-center px-8 hover:text-gray-600 disabled:text-gray-500'
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}

export default ResultList
