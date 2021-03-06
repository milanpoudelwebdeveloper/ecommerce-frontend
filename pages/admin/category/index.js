import React, { useEffect, useState } from 'react'
import PrivateAdminAuth from '../../../auth/privateAdminAuth'
import AdminNav from '../../../components/AdminNav'

import {
  getCategories,
  deleteCategory,
  createCategory,
} from '../../../apiFunctions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import CategoryCreateForm from '../../../components/forms/CategoryCreateForm'
import CategoriesCard from '../../../components/CategoriesCard'
import SearchForm from '../../../components/forms/SearchForm'

//we can create,load and delete categories on this component but to update we need to navigate to another page

const Category = () => {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((e) => {
        console.log(e)
        toast.error('Something went wrong while fetching categories')
      })
  }

  const categoryCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!name) {
      toast.error('Name is required')
      setLoading(false)
      return
    }
    try {
      const response = await createCategory({ name }, user.token)
      toast.success(response.data)
      setName('')
      setLoading(false)
      loadCategories()
    } catch (e) {
      console.log(e)
      toast.error(e.response.data)
      setLoading(false)
    }
  }

  const categoryDelete = async (slug, authToken) => {
    let answer = window.confirm('Delete?')
    if (answer) {
      try {
        const response = await deleteCategory(slug, authToken)
        toast.success(response.data)
        loadCategories()
      } catch (e) {
        console.log(e)
        toast.error(e.response.data)
      }
    }
  }

  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  const filteredResults = (array) => {
    const result = array.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    )
    return result
  }
  return (
    <PrivateAdminAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            <div className="text-center">
              <h4>Create Category</h4>
            </div>
            <CategoryCreateForm
              categoryCreate={categoryCreate}
              name={name}
              setName={setName}
              loading={loading}
            />
            <SearchForm
              handleSearchChange={handleSearchChange}
              keyword={keyword}
            />
            <hr />
            {categories &&
              filteredResults(categories).map(({ name, slug, _id }) => (
                <CategoriesCard
                  key={_id}
                  name={name}
                  slug={slug}
                  id={_id}
                  link={`/admin/category/${slug}`}
                  categoryDelete={() => categoryDelete(slug, user.token)}
                />
              ))}
          </div>
        </div>
      </div>
      ;
    </PrivateAdminAuth>
  )
}

export default Category
