import React, { useEffect, useState } from 'react'
import PrivateAdminAuth from '../../../auth/privateAdminAuth'
import AdminNav from '../../../components/AdminNav'
import CategoryCreateForm from '../../../components/forms/CategoryCreateForm'
import SearchForm from '../../../components/forms/SearchForm'
import CategoriesCard from '../../../components/CategoriesCard'
import {
  createSub,
  getSubs,
  deleteSub,
} from '../../../apiFunctions/subCategory'
import { getCategories } from '../../../apiFunctions/category'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SubCategory = () => {
  const [subName, setSubName] = useState('')
  const [keyword, setKeyword] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState('')

  const user = useSelector((state) => state.user)

  useEffect(() => {
    loadSubCategories()
    loadCategories()
  }, [])

  const loadSubCategories = async () => {
    const response = await getSubs()
    setSubCategories(response.data)
  }

  const loadCategories = async () => {
    const response = await getCategories()
    setCategories(response.data)
  }

  const filterSubCategories = (array) => {
    const results = array.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    )
    return results
  }

  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value)
  }

  const subCategoryData = {
    name: subName,
    parent: selectedCategory,
  }

  const createSubCategory = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await createSub(subCategoryData, user.token)
      toast.success(response.data)
      loadSubCategories()
      setLoading(false)
    } catch (e) {
      console.log(e)
      toast.error(e.response.data)
      setLoading(false)
    }
  }

  const deleteSubCategory = async (slug, token) => {
    const answer = window.confirm('Do you want to delete this sub-category?')
    if (answer) {
      try {
        const response = await deleteSub(slug, token)
        toast.success(response.data)
        loadSubCategories()
      } catch (e) {
        console.log(e)
        toast.error(e.response.data)
      }
    }
  }

  return (
    <PrivateAdminAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            <h4>Create sub-category</h4>
            <div className="form-group my-3">
              <label>Category</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>Please select category</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <CategoryCreateForm
              categoryCreate={createSubCategory}
              name={subName}
              setName={setSubName}
              loading={loading}
              title="Create sub-category"
            />
            <SearchForm
              handleSearchChange={handleSearchChange}
              keyword={keyword}
            />
            <hr />
            {subCategories &&
              filterSubCategories(subCategories).map(({ name, slug, _id }) => (
                <CategoriesCard
                  key={_id}
                  name={name}
                  slug={slug}
                  id={_id}
                  link={`/admin/sub-category/${slug}`}
                  categoryDelete={() => deleteSubCategory(slug, user.token)}
                />
              ))}
          </div>
        </div>
      </div>
      ;
    </PrivateAdminAuth>
  )
}

export default SubCategory
