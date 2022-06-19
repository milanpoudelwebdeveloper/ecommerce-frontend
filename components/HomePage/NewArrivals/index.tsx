import React, { useEffect, useState } from 'react'
import { getProducts } from '../../../apiFunctions/product'
import Jumbotron from '../../Common/Jumbotron'
import LoadingCardSkeleton from '../../Common/LoadingCardSkeleton'
import Pagination from '../../Common/Pagination'
import ProductCardHome from '../../ProductCardHome'

const NewArrivals: React.FC<{ totalProductsCount: number }> = ({
  totalProductsCount,
}) => {
  const [loading, setLoading] = useState(false)
  const [newProducts, setNewProducts] = useState<IProduct[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadNewProducts()
  }, [currentPage])

  const loadNewProducts = async () => {
    setLoading(true)
    try {
      const response = await getProducts('createdAt', 'desc', currentPage)
      setNewProducts(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <>
      <Jumbotron text={loading ? 'Loading' : 'Latest Products'} />
      <h4 className="text-center p-3 mt-5 mb-5 display-5 jumboton">
        New Arrivals
      </h4>
      <div className="container mb-4">
        {loading ? (
          <LoadingCardSkeleton count={3} />
        ) : (
          <div className="row">
            {newProducts.map((p) => (
              <div className="col-md-4 mt-4" key={p._id}>
                <ProductCardHome product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalItems={totalProductsCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}

export default NewArrivals
