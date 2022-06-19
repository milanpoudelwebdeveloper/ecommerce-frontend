import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { getTotalProductsCount } from '../apiFunctions/product'
import BestSellers from '../components/HomePage/BestSellers'
import CategoriesList from '../components/HomePage/CategoriesList'
import NewArrivals from '../components/HomePage/NewArrivals'
import SubsList from '../components/HomePage/SubsList'

const Home: NextPage = () => {
  const [totalProductsCount, setTotalProductsCount] = useState(0)

  useEffect(() => {
    loadTotalProductsCount()
  }, [])

  const loadTotalProductsCount = async () => {
    try {
      const response = await getTotalProductsCount()
      setTotalProductsCount(response.data)
    } catch (e) {
      console.log(e)
    }
  }

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
