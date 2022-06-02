import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getProductInfo } from '../../apiFunctions/product'
import ProductInfoCard from '../../components/ProductInfoCard'

const Product = () => {
  const [productInfo, setProductInfo] = useState({})
  const router = useRouter()
  const {
    query: { id },
  } = router

  useEffect(() => {
    loadProductInfo()
  }, [router.isReady])

  const loadProductInfo = async () => {
    const response = await getProductInfo(id)
    setProductInfo((prev) => ({ ...prev, ...response.data }))
  }
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ProductInfoCard product={productInfo} />
      </div>
      <div className="row p-5">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Product
