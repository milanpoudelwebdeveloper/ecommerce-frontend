import React from 'react'

interface props {
  handleSearchChange: (_: any) => void
  keyword: string
}

const SearchForm: React.FC<props> = ({ handleSearchChange, keyword }) => {
  return (
    <input
      type="text"
      placeholder="Search here"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  )
}

export default SearchForm
