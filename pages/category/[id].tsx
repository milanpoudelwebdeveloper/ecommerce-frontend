import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCategory } from '../../apiFunctions/category'
import ProductCardHome from '../../components/ProductCardHome'
import { NextPage } from 'next'

const CategoryInfo: NextPage = () => {
  //fetching all products from that category
  const [category, setCategory] = useState<any>([])
  const [allProducts, setAllProducts] = useState<IProduct[]>([])
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
      const response = await getCategory(id as string)
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
          <div className="col-md-4" key={p._id}>
            <ProductCardHome product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryInfo
