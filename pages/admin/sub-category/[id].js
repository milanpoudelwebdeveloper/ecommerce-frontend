import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategories } from '../../../apiFunctions/category'
import { getSub, updateSub } from '../../../apiFunctions/subCategory'
import AdminNav from '../../../components/AdminNav'

const UpdateSubCategory = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subName, setSubName] = useState('')
  const [categories, setCategories] = useState([])

  const user = useSelector((state) => state.user)

  const {
    query: { id },
  } = router

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    getSubInfo(id)
    loadCategories()
  }, [router.isReady])

  const loadCategories = async () => {
    try {
      const response = await getCategories()
      setCategories(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getSubInfo = async (slug) => {
    const response = await getSub(slug)

    setSelectedCategory(response.data.parent)
    setSubName(response.data.subCategory.name)
  }

  const subUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await updateSub(
        id,
        {
          name: subName,
          parent: selectedCategory,
        },
        user.token
      )
      toast.success(response.data)
      router.push('/admin/sub-category')
    } catch (e) {
      console.log(e)
      toast.error(e.response.data)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Update Sub-Category</h4>

          <form onSubmit={subUpdate}>
            <div className="form-group">
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
                      <option
                        value={category._id}
                        key={category._id}
                        selected={selectedCategory === category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <label className="mb-3">Name</label>
              <input
                placeholder="Please enter the subcategory name"
                required
                autoFocus
                type="text"
                className="form-control"
                value={subName}
                name="name"
                onChange={(e) => setSubName(e.target.value)}
              />
              <button
                className="btn btn-outline-primary my-3"
                disabled={!subName}
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateSubCategory
