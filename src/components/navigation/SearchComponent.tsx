import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { ResultList } from './ResultList'
import { SearchBox } from './SearchBox'

interface SearchComponentProps {
  initialResults: string[]
  initialTotalPages: number
}

const SearchComponent = ({
  initialResults,
  initialTotalPages,
}: SearchComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<string[]>(initialResults)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const debouncedSearchTerm = useDebounce(searchTerm, 250, 3)

  async function searchTopics() {
    const url = `/api/search/topics?q=${encodeURIComponent(
      searchTerm
    )}&page=${page}&size=24`
    const { topics, pagination } = await fetch(url).then((res) => res.json())
    setResults(topics?.map((hit: { name: string }) => hit.name as string) || [])
    setTotalPages(pagination.total_pages)
  }

  function handleSearchTermChange(term: string) {
    setSearchTerm(term)
    setPage(1)
  }

  function handlePrevPage() {
    setPage(page - 1)
  }

  function handleNextPage() {
    setPage(page + 1)
  }

  useEffect(() => {
    searchTopics()
  }, [debouncedSearchTerm, page])

  return (
    <div className='flex flex-col'>
      <div>
        <SearchBox
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
        />
      </div>
      <div className='py-6'>
        <ResultList
          results={results}
          currentPage={page}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  )
}

export default SearchComponent
