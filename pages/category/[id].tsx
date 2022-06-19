import React from 'react'
import { useRouter } from 'next/router'
import { getCategory } from '../../apiFunctions/category'
import ProductCardHome from '../../components/ProductCardHome'
import { NextPage } from 'next'
import { useQuery } from 'react-query'

const CategoryInfo: NextPage = () => {
  const router = useRouter()

  const {
    query: { id },
  } = router

  const loadProductsAndCategoryInfo = async () => {
    const response = await getCategory(id as string)
    return response.data
  }

  const query = ['information', id]

  const { isLoading, error, data } = useQuery(
    query,
    loadProductsAndCategoryInfo,
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  //without query

  // useEffect(() => {
  //   loadCategoryInfo()
  // }, [router.isReady])

  // const loadCategoryInfo = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await getCategory(id as string)
  //     const category = response.data.category
  //     const allProducts = response.data.allProducts
  //     setCategory(category)
  //     setAllProducts(allProducts)
  //     setLoading(false)
  //   } catch (e) {
  //     console.log(e)
  //     setLoading(false)
  //   }
  // }

  if (error) {
    console.log("error while fetching category and it's products", error)
    return <div>Error when fetching data</div>
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {isLoading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {data?.allProducts?.length} in &quot;{data?.category?.name}&quot;
              category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {data?.allProducts.map((p: IProduct) => (
          <div className="col-md-4" key={p._id}>
            <ProductCardHome product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryInfo
