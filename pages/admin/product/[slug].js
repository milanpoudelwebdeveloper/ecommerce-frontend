import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/AdminNav'
import { getProductInfo, updateProduct } from '../../../apiFunctions/product'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories, getCategorySubs } from '../../../apiFunctions/category'
import { Avatar, Badge, Select } from 'antd'
import { deleteImage } from '../../../apiFunctions/uploadImage'
import { useRouter } from 'next/router'
import FileUpload from '../../../components/forms/fileUpload'

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
  //we have colors from enum in backend so this is for giving options
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'Dell'],
  color: '',
  brand: '',
}

const ProductUpdate = () => {
  const [values, setValues] = useState(initialState)
  const [imagesLoading, setImagesLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const user = useSelector((state) => state.user)
  const authToken = user?.token

  const router = useRouter()

  const {
    query: { slug },
  } = router

  useEffect(() => {
    if (!slug) {
      return
    }
    loadCategories()
    loadProductInfo(slug)
  }, [slug, router.isReady])

  useEffect(() => {
    if (!values.category) {
      return
    }
    loadCategorySubs(values.category._id || values.category)
  }, [values.category])

  const loadCategories = async () => {
    const response = await getCategories()
    setValues({ ...values, categories: response.data })
  }
  const loadCategorySubs = async (categoryId) => {
    const response = await getCategorySubs(categoryId)
    setValues((prevState) => ({
      ...prevState,
      subCategoriesList: response.data,
    }))
  }

  const loadProductInfo = async (slug) => {
    const response = await getProductInfo(slug)
    console.log(response.data)
    let preSubs = []
    response?.data?.subs?.map((sub) => preSubs.push(sub._id))
    setValues((prevState) => ({
      ...prevState,
      ...response.data,
      subs: preSubs,
    }))
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
    colors,
    color,
    brands,
    shipping,
    brand,
  } = values

  const productUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      const response = await updateProduct(values, slug, authToken)
      setValues((prevState) => ({ ...prevState, ...response.data }))
      toast.success('Product updated succesfully')
      setUpdating(false)
    } catch (e) {
      setUpdating(false)
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
      setValues((prevValues) => ({ ...prevValues, images: leftImages }))
      toast.success(response.data)
    } catch (e) {
      console.log(e)
      toast.error(e)
    }
  }

  console.log('images are', values.images)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Update a product</h4>
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
          {imagesLoading && (
            <p style={{ color: 'red' }}>Uploading image...Please wait</p>
          )}
          <FileUpload
            values={values}
            setValues={setValues}
            setImageLoading={setImagesLoading}
          />
          <form onSubmit={productUpdate}>
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
                value={category._id}
                onChange={handleCategoryChange}
              >
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
                  placeholder="Please select"
                  mode="multiple"
                  style={{ width: '100%' }}
                  //here values should be array of ids
                  value={subs}
                  name="subs"
                  onChange={(value) => {
                    setValues({ ...values, subs: value })
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
                value={shipping}
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
                value={color}
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
                value={brand}
              >
                <option>Please Select Brand</option>
                {brands.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-outline-info">
              {updating ? 'Updating' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate
