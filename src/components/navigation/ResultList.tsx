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
      <ul>
        {results.map((result) => (
          <li key={`result_${result}`}>{result}</li>
        ))}
      </ul>
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
