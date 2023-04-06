import React, { ChangeEventHandler, useCallback } from 'react'

interface SearchBoxProps {
  searchTerm: string
  onSearchTermChange: (term: string) => void
}

export function SearchBox({ searchTerm, onSearchTermChange }: SearchBoxProps) {
  const handleSearchTermChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      onSearchTermChange(event.target.value)
    },
    [onSearchTermChange]
  )

  return (
    <div>
      <label htmlFor='search'>Search topics:</label>
      <input
        id='search'
        type='text'
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  )
}
