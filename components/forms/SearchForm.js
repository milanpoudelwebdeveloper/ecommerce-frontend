import React from 'react'

const SearchForm = ({ handleSearchChange, keyword }) => {
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
