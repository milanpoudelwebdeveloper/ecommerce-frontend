import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchProductsByFilter,
  getProductsByCount,
} from '../apiFunctions/product'
import ProductCardHome from '../components/ProductCardHome'
import { Menu } from 'antd'
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons'
import PriceRange from '../components/Filters/PriceRange'
import CategoryFilter from '../components/Filters/CategoryFilter'
import { getCategories } from '../apiFunctions/category'
import LoadingCardSkeleton from '../components/Common/LoadingCardSkeleton'
import StarRatings from '../components/Filters/StarRatings'
import { getSubs } from '../apiFunctions/subCategory'
import SubsFilter from '../components/Filters/SubsFilter'

const { SubMenu } = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [allSubs, setAllSubs] = useState([])
  const [loading, setLoading] = useState(false)
  const search = useSelector((state) => state.search)

  const { text } = search

  const [searchQueries, setSearchQueries] = useState({
    searchText: text,
    price: [0, 10000],
    selectedCategories: [],
    star: 0,
    selectedSubs: [],
  })

  useEffect(() => {
    setSearchQueries({ ...searchQueries, searchText: text })
  }, [text])

  const { searchText, price, selectedCategories, star, selectedSubs } =
    searchQueries

  useEffect(() => {
    loadProducts()
    loadAllCategories()
    loadAllSubs()
  }, [])

  //load all categories

  const loadAllCategories = async () => {
    try {
      const response = await getCategories()
      setAllCategories(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  //load all subCategories

  const loadAllSubs = async () => {
    try {
      const response = await getSubs()
      setAllSubs(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  //load products by default on page load
  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await getProductsByCount(12)
      setProducts(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  //load products on user search input

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProductByFilter(searchQueries)
    }, 300)
    return () => clearTimeout(delayed)
  }, [searchText, price, selectedCategories, star, selectedSubs])

  const fetchProductByFilter = async (arg) => {
    setLoading(true)
    try {
      setLoading(false)
      const response = await fetchProductsByFilter(arg)
      setProducts(response.data)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  console.log('the final values are', searchQueries)

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-3">
          <h4>Search Filter</h4>
          <Menu mode="inline" defaultOpenKeys={['1', '2', '3', '4']}>
            <SubMenu
              key={'1'}
              title={
                <span
                  className="h6"
                  style={{ display: 'flex', alignItems: 'center', gap: '3' }}
                >
                  <DollarOutlined style={{ marginLeft: '10px' }} />
                  <span>Price</span>
                </span>
              }
            >
              <PriceRange key={'1'} price={price} setPrice={setSearchQueries} />
            </SubMenu>
            <SubMenu
              key={'2'}
              title={
                <span
                  className="h6"
                  style={{ display: 'flex', alignItems: 'center', gap: '3' }}
                >
                  <DownSquareOutlined style={{ marginLeft: '10px' }} />
                  <span>Categories</span>
                </span>
              }
            >
              <CategoryFilter
                categories={allCategories}
                setCategories={setSearchQueries}
                selectedCategories={selectedCategories}
              />
            </SubMenu>
            <SubMenu
              className="mt-3"
              key="3"
              title={
                <span
                  className="h6"
                  style={{ display: 'flex', alignItems: 'center', gap: '3' }}
                >
                  <StarOutlined style={{ marginLeft: '10px' }} />
                  <span>Stars</span>
                </span>
              }
            >
              <StarRatings star={star} setStar={setSearchQueries} />
            </SubMenu>
            {allSubs.length > 0 && (
              <SubMenu
                className="mt-3"
                key="4"
                title={
                  <span
                    className="h6"
                    style={{ display: 'flex', alignItems: 'center', gap: '3' }}
                  >
                    <StarOutlined style={{ marginLeft: '10px' }} />
                    <span>Sub-Categories</span>
                  </span>
                }
              >
                <div style={{ margin: '-1opx' }}>
                  <SubsFilter
                    subsLists={allSubs}
                    selectedSubs={selectedSubs}
                    setSelectedSubs={setSearchQueries}
                  />
                </div>
              </SubMenu>
            )}
          </Menu>
        </div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading....</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <p>No Products Found</p>}
          <div className="row pb-5">
            {loading ? (
              <LoadingCardSkeleton count={5} />
            ) : (
              <>
                {products.map((p) => (
                  <div key={p._id} className="col-md-4 mt-3">
                    <ProductCardHome product={p} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
