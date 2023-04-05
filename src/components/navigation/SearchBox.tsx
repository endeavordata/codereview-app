import React, { ChangeEventHandler } from 'react'

interface SearchBoxProps {
  searchTerm: string
  onSearchTermChange: (term: string) => void
}

export function SearchBox({ searchTerm, onSearchTermChange }: SearchBoxProps) {
  const handleSearchTermChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onSearchTermChange(event.target.value)
  }

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
