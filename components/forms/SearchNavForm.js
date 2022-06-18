import React from 'react'
import { useRouter } from 'next/router'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { searchQuery } from '../../app/searchSlice'

const SearchNavForm = () => {
  let dispatch = useDispatch()
  const router = useRouter()
  const search = useSelector((state) => state.search)
  const { text } = search

  const handleKeyWordChange = (e) => {
    dispatch(searchQuery({ text: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/shop/?${text}`)
  }
  return (
    <form
      className="form-inline my-2 my-lg-0"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px',
      }}
    >
      <input
        type="search"
        value={text}
        placeholder="Search for any product"
        className="form-control"
        onChange={handleKeyWordChange}
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  )
}

export default SearchNavForm
