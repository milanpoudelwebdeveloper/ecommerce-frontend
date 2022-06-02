import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCategory } from '../../apiFunctions/category'
import ProductCardHome from '../../components/ProductCardHome'

const CategoryInfo = () => {
  //fetching all products from that category
  const [category, setCategory] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    query: { id },
  } = router

  useEffect(() => {
    loadCategoryInfo()
  }, [router.isReady])

  const loadCategoryInfo = async () => {
    setLoading(true)
    try {
      const response = await getCategory(id)
      const category = response.data.category
      const allProducts = response.data.allProducts
      setCategory(category)
      setAllProducts(allProducts)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {allProducts?.length} in &quot;{category?.name}&quot; category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {allProducts.map((p) => (
          <div className="col" key={p._id}>
            <ProductCardHome product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryInfo
