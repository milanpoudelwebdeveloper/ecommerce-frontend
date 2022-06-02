import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getSub } from '../../apiFunctions/subCategory'
import ProductCardHome from '../../components/ProductCardHome'

const SubCategoryInfo = () => {
  const [allSubProducts, setAllSubProducts] = useState([])
  const [subCategory, setSubCategory] = useState({})
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const {
    query: { id },
  } = router

  useEffect(() => {
    loadInfo()
  }, [router.isReady])

  const loadInfo = async () => {
    setLoading(true)
    try {
      const response = await getSub(id)
      const subCategory = response.data.subCategory
      const allSubProducts = response.data.allSubProducts
      setAllSubProducts(allSubProducts)
      setSubCategory(subCategory)
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
              {allSubProducts?.length} in "{subCategory?.name}" sub-category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {allSubProducts.map((p) => (
          <div className="col" key={p._id}>
            <ProductCardHome product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubCategoryInfo
