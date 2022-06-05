import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../apiFunctions/product'
import ProductCardHome from '../components/ProductCardHome'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const search = useSelector((state) => state.search)

  const { text } = search

  useEffect(() => {
    loadProducts()
  }, [])

  //load products by default on page load
  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await getProductsByCount(12)
      setProducts(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  //load products on user search input

  useEffect(() => {
    if (text !== '') {
      console.log('Text based search running')
      fetchProductByFilter({ query: text })
    } else {
      loadProducts()
    }
  }, [text])

  const fetchProductByFilter = async (text) => {
    try {
      const response = await fetchProductsByFilter(text)
      setProducts(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-3">Search/Filter Menu</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading....</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <p>No Products Found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCardHome product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
