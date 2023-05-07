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
    <div className='my-6 flex w-full flex-col items-center space-y-8'>
      <div>
        <label htmlFor='search' className='text-3xl'>
          Search Topics
        </label>
      </div>
      <div>
        <input
          id='search'
          type='text'
          value={searchTerm}
          onChange={handleSearchTermChange}
          className='w-72 rounded-md shadow-sm sm:w-96'
        />
      </div>
    </div>
  )
}
