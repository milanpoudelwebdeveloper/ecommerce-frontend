import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { getSub } from '../../apiFunctions/subCategory'
import ProductCardHome from '../../components/ProductCardHome'

const SubCategoryInfo: NextPage = () => {
  // const [allSubProducts, setAllSubProducts] = useState<ISubCategory[]>([])
  // const [subCategory, setSubCategory] = useState<ISubCategory>(
  //   {} as ISubCategory
  // )
  // const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    query: { id },
  } = router

  const loadSubInfoAndItsProducts = async () => {
    const response = await getSub(id as string)
    return response.data
  }

  const query = ['subs-products', id]

  const { isLoading, error, data } = useQuery(
    query,
    loadSubInfoAndItsProducts,
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  //without react-query
  // useEffect(() => {
  //   loadInfo()
  // }, [router.isReady])

  // const loadInfo = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await getSub(id as string)
  //     const subCategory = response.data.subCategory
  //     const allSubProducts = response.data.allSubProducts
  //     setAllSubProducts(allSubProducts)
  //     setSubCategory(subCategory)
  //     setLoading(false)
  //   } catch (e) {
  //     console.log(e)
  //     setLoading(false)
  //   }
  // }
  if (error) {
    console.log("error while fetching subCategory and it's products", error)
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
              {data?.allSubProducts?.length} in &quot;{data?.subCategory?.name}
              &quot; sub-category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {data?.allSubProducts.map((p: IProduct) => (
          <div className="col-md-4" key={p._id}>
            <ProductCardHome product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubCategoryInfo
