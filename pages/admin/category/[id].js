import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../apiFunctions/category'
import { toast } from 'react-toastify'
import AdminNav from '../../../components/AdminNav'

//we will update category on this page

const CategoryUpdate = () => {
  const router = useRouter()

  const user = useSelector((state) => state.user)

  const {
    query: { id },
  } = router

  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (!router.isReady) {
      return
    } else {
      getCategoryInfo()
    }
  }, [id, router.isReady])

  //getting category info that is name
  const getCategoryInfo = async () => {
    try {
      const response = await getCategory(id)
      setCategoryName(response.data.category.name)
    } catch (e) {
      console.log(e)
    }
  }

  const categoryUpdate = async (e) => {
    e.preventDefault()
    console.log(user.token)
    try {
      const response = await updateCategory(
        id,
        { name: categoryName },
        user.token
      )
      toast.success(response.data)
      router.push('/admin/category')
    } catch (e) {
      console.log(e.response.data)
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
          <h4>Update Category</h4>

          <form onSubmit={categoryUpdate}>
            <div className="form-group">
              <label className="mb-3">Name</label>
              <input
                placeholder="Please enter the category name"
                required
                autoFocus
                type="text"
                className="form-control"
                value={categoryName}
                name="name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <button
                className="btn btn-outline-primary my-3"
                disabled={!categoryName}
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

export default CategoryUpdate
