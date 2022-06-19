import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { getProducts } from '../../../apiFunctions/product'
import Jumbotron from '../../Common/Jumbotron'
import LoadingCardSkeleton from '../../Common/LoadingCardSkeleton'
import Pagination from '../../Common/Pagination'
import ProductCardHome from '../../ProductCardHome'

const NewArrivals: React.FC<{ totalProductsCount: number }> = ({
  totalProductsCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const getNewProducts = async () => {
    const response = await getProducts('createdAt', 'desc', currentPage)
    return response.data
  }

  const { isLoading, error, data } = useQuery(
    ['new-arrivals', currentPage],
    getNewProducts
  )

  if (error) {
    console.log(error)
    return <div>Error while fetching new arrivals</div>
  }

  //our previous way without using react-query
  // useEffect(() => {
  //   loadNewProducts()
  // }, [currentPage])

  // const loadNewProducts = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await getProducts('createdAt', 'desc', currentPage)
  //     setNewProducts(response.data)
  //     setLoading(false)
  //   } catch (e) {
  //     console.log(e)
  //     setLoading(false)
  //   }
  // }

  return (
    <>
      <Jumbotron text={isLoading ? 'Loading' : 'Latest Products'} />
      <h4 className="text-center p-3 mt-5 mb-5 display-5 jumboton">
        New Arrivals
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
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}

export default NewArrivals
