import React, { useEffect, useState } from 'react'
import { getTotalProductsCount } from '../apiFunctions/product'
import BestSellers from '../components/HomePage/BestSellers'
import CategoriesList from '../components/HomePage/CategoriesList'
import NewArrivals from '../components/HomePage/NewArrivals'
import SubsList from '../components/HomePage/SubsList'

const Home = () => {
  const [totalProductsCount, setTotalProductsCount] = useState(0)
  useEffect(() => {
    loadTotalProductsCount()
  }, [])

  const loadTotalProductsCount = async () => {
    console.log('total products count running')
    try {
      const response = await getTotalProductsCount()
      setTotalProductsCount(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('total products count is', totalProductsCount)

  return (
    <div>
      <NewArrivals totalProductsCount={totalProductsCount} />
      <BestSellers totalProductsCount={totalProductsCount} />
      <CategoriesList />
      <SubsList />
    </div>
  )
}

export default Home
