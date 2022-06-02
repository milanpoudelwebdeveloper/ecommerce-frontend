import React, { useEffect, useState } from 'react'
import { getCategories } from '../../../apiFunctions/category'
import Link from 'next/link'

const CategoriesList = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      const response = await getCategories()
      setCategories(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const showCategories = () => {
    return categories.map((c) => (
      <Link href={`/category/${c.slug}`} key={c._id}>
        <div
          key={c._id}
          className="col btn btn-outline-primary btn-lg btn-block btn-raised m-3"
        >
          {c.name}
        </div>
      </Link>
    ))
  }
  return (
    <div className="container-fluid">
      <div
        className="jumbotron text-danger h1 text-center"
        style={{ padding: '20px', background: '#E9ECEF', width: '100%' }}
      >
        Categories
      </div>
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading....</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  )
}

export default CategoriesList
