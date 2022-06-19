import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getProducts } from '../../../apiFunctions/product'
import Jumbotron from '../../Common/Jumbotron'
import LoadingCardSkeleton from '../../Common/LoadingCardSkeleton'
import Pagination from '../../Common/Pagination'
import ProductCardHome from '../../ProductCardHome'

const BestSellers: React.FC<{ totalProductsCount: number }> = ({
  totalProductsCount,
}) => {
  // const [bestSellers, setBestSellers] = useState<IProduct[]>([])
  // const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const getBestSellers = async () => {
    const response = await getProducts('sold', 'desc', currentPage)
    return response.data
  }

  const { isLoading, error, data } = useQuery(
    ['best-sellers', currentPage],
    getBestSellers
  )

  //without useQuery
  // useEffect(() => {
  //   loadBestSellers()
  // }, [currentPage])

  // const loadBestSellers = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await getProducts('sold', 'desc', currentPage)
  //     setBestSellers(response.data)
  //     setLoading(false)
  //   } catch (e) {
  //     setLoading(false)
  //     console.log(e)
  //   }
  // }

  if (error) {
    console.log(error)
    return <div>Error while fetching best sellers</div>
  }

  return (
    <div className="my-5">
      <Jumbotron text={isLoading ? 'Loading' : 'Best Sellers'} />
      <h4 className="text-center p-3 mt-4 mb-4 display-5 jumboton">
        Best Sellers
      </h4>
      <div className="container mb-4">
        {isLoading ? (
          <LoadingCardSkeleton count={3} />
        ) : (
          <div className="row">
            {data.map((p: IProduct) => (
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
