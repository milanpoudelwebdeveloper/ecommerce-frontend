import React, { useEffect, useState } from 'react'
import { getProducts } from '../../../apiFunctions/product'
import Jumbotron from '../../Common/Jumbotron'
import LoadingCardSkeleton from '../../Common/LoadingCardSkeleton'
import Pagination from '../../Common/Pagination'
import ProductCardHome from '../../ProductCardHome'

const BestSellers: React.FC<{ totalProductsCount: number }> = ({
  totalProductsCount,
}) => {
  const [bestSellers, setBestSellers] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadBestSellers()
  }, [currentPage])

  const loadBestSellers = async () => {
    setLoading(true)
    try {
      const response = await getProducts('sold', 'desc', currentPage)
      setBestSellers(response.data)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  return (
    <div className="my-5">
      <Jumbotron text={loading ? 'Loading' : 'Best Sellers'} />
      <h4 className="text-center p-3 mt-4 mb-4 display-5 jumboton">
        Best Sellers
      </h4>
      <div className="container mb-4">
        {loading ? (
          <LoadingCardSkeleton count={3} />
        ) : (
          <div className="row">
            {bestSellers.map((p) => (
              <div className="col-md-4 mt-4" key={p._id}>
                <ProductCardHome product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalItems={totalProductsCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default BestSellers
