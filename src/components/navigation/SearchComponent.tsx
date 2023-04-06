import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { ResultList } from './ResultList'
import { SearchBox } from './SearchBox'

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<string[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const debouncedSearchTerm = useDebounce(searchTerm, 250, 3)

  async function searchTopics() {
    const url = `/api/search/topics?q=${encodeURIComponent(
      searchTerm
    )}&page=${page}`
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
    if (debouncedSearchTerm) {
      searchTopics()
    }
  }, [debouncedSearchTerm, page])

  return (
    <>
      <SearchBox
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      <ResultList
        results={results}
        currentPage={page}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </>
  )
}

export default SearchComponent
