import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/AdminNav'
import { createProduct } from '../../../apiFunctions/product'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories, getCategorySubs } from '../../../apiFunctions/category'
import { Avatar, Badge, Select } from 'antd'
import FileUpload from '../../../components/forms/fileUpload'
import { deleteImage } from '../../../apiFunctions/uploadImage'
import { colors, brands } from '../../../data/productData'

const { Option } = Select

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subCategoriesList: [],
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  color: '',
  brand: '',
}

const ProductCreate = () => {
  const [values, setValues] = useState(initialState)
  const user = useSelector((state) => state.user)
  const [imageLoading, setImageLoading] = useState(false)

  const authToken = user?.token

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadCategorySubs()
  }, [values.category])

  const loadCategories = async () => {
    const response = await getCategories()
    setValues({ ...values, categories: response.data })
  }

  const loadCategorySubs = async () => {
    if (category) {
      const response = await getCategorySubs(category)
      setValues({ ...values, subCategoriesList: response.data })
    }
  }

  const {
    title,
    description,
    price,
    categories,
    category,
    subCategoriesList,
    subs,
    quantity,
    images,
  } = values

  const productCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await createProduct(values, authToken)
      toast.success(response.data)
      window.location.reload()
    } catch (e) {
      console.log(e)
      toast.error(e.response.data)
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (e) => {
    setValues({ ...values, subs: [], category: e.target.value })
  }

  const handleImageRemove = async (imageId) => {
    try {
      const response = await deleteImage(imageId, authToken)
      const { images } = values
      let leftImages = images.filter((image) => image.public_id !== imageId)
      setValues({ ...values, images: leftImages })
      toast.success(response.data)
    } catch (e) {
      console.log(e)
      toast.error(e)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Create a product</h4>
          <hr />
          {images &&
            images.map((i, index) => (
              <Badge
                count="X"
                onClick={() => handleImageRemove(i.public_id)}
                key={index}
              >
                <Avatar
                  src={i.url}
                  key={i.public_id}
                  size={100}
                  shape="square"
                  className="m-4"
                />
              </Badge>
            ))}
          {imageLoading && (
            <p style={{ color: 'red' }}>Uploading image...Please wait</p>
          )}
          <form onSubmit={productCreate}>
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setImageLoading={setImageLoading}
              />
            </div>

            <div className="form-group my-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a product name"
                className="form-control my-2"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                className="form-control my-2"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-my-3">
              <label>Category</label>
              <select
                name="category"
                className="form-control my-2"
                onChange={handleCategoryChange}
              >
                <option>Please Select</option>
                {categories.map((c) => (
                  <option key={c.name} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {subCategoriesList.length > 0 && (
              <div>
                <label>Sub-Category</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  value={subs}
                  name="subs"
                  onChange={(value) => {
                    setValues({ ...values, subs: value })
                    console.log(value)
                  }}
                >
                  {subCategoriesList.map((s) => (
                    <Option value={s._id} key={s._id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </div>
            )}

            <div className="form-group my-3">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                className="form-control my-2"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control my-2"
                onChange={handleChange}
              >
                <option>Please Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="form-group my-3">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className="form-control my-2"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-3">
              <label>Color</label>
              <select
                name="color"
                className="form-control my-2"
                onChange={handleChange}
              >
                <option>Please Select Color</option>
                {colors.map((color) => (
                  <option value={color} key={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-3">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control my-2"
                onChange={handleChange}
              >
                <option>Please Select Brand</option>
                {brands.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
