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
    <>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
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
      <div>
        <button disabled={currentPage === 1} onClick={onPrevPage}>
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button disabled={currentPage === totalPages} onClick={onNextPage}>
          Next
        </button>
      </div>
    </>
  )
}

export default ResultList
