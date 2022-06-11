import React, { useEffect, useState } from 'react'
import PrivateAdminAuth from '../../auth/privateAdminAuth'
import AdminNav from '../../components/AdminNav'
import { deleteProduct, getProductsByCount } from '../../apiFunctions/product'
import { toast } from 'react-toastify'
import ProductCard from '../../components/ProductCard'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const loadProducts = async () => {
    try {
      const response = await getProductsByCount(100)
      setProducts(response.data)
    } catch (e) {
      console.log(e)
      toast.error('Something went wrong while trying to fetch products')
    }
  }

  const productDelete = async (slug, token) => {
    const answer = window.confirm(
      'Are you sure you want to delete this product'
    )
    if (answer) {
      try {
        const response = await deleteProduct(slug, token)

        toast.success(response.data)
        loadProducts()
      } catch (e) {
        console.log(e)
        toast.error(e.response.data)
      }
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <PrivateAdminAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="row">
              <h4 className="mt-2">All Products</h4>
              {products.length > 0 &&
                products.map((p) => (
                  <div key={p._id} className="col-md-4 mt-2">
                    <ProductCard product={p} productDelete={productDelete} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      ;
    </PrivateAdminAuth>
  )
}

export default AllProducts
