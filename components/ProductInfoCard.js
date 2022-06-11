import React, { useState } from 'react'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import ImageCarousel from './Common/ImageCarousel'
import ProductRightInfo from './ProductRightInfo'
import { Rating } from 'react-simple-star-rating'
import RatingModal from './RatingModal'
import { setRating } from '../apiFunctions/product'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAverageRating } from '../utils/getAverageRating'
import { addToWishList } from '../apiFunctions/wishlist'
import { handleAddToCart } from '../utils/addToCart'
import { addToCart } from '../app/cartSlice'
import { useRouter } from 'next/router'

const { TabPane } = Tabs

const ProductInfoCard = ({ product }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()
  const { title, description, images, _id, ratings, slug } = product
  const token = user?.token

  const [selectedStar, setSelectedStar] = useState(0)

  const [toolTipText, setToolTipText] = useState('Click to Add')

  const sendRating = async () => {
    try {
      const realStar = selectedStar / 20
      const response = await setRating(_id, user.token, realStar)
      toast.success(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const addWishlist = async () => {
    if (user && user.token) {
      try {
        const response = await addToWishList(_id, token)
        toast.success(response.data)
      } catch (e) {
        console.log(e)
      }
    } else {
      router.push({
        pathname: '/login',
        query: { from: `/product/${slug}` },
      })
    }
  }

  const addToCartHandler = () => {
    const uniqueCartItems = handleAddToCart(product)
    dispatch(addToCart(uniqueCartItems))
    setToolTipText('Added')
  }

  const averageRatings = ratings && getAverageRating(ratings)

  return (
    <>
      <div className="col-md-6">
        <ImageCarousel
          images={
            images && images.length > 0
              ? images
              : ['https://via.placeholder.com/150']
          }
        />
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on number xxxx xxxx xxxx to get more information about
            products
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-6">
        <h1 className="bg-info p-3">{title}</h1>
        {ratings?.length > 0 ? (
          <Rating ratingValue={averageRatings * 20} readonly fillColor="red" />
        ) : (
          <div className="text-center pt-1 pb-3">No ratings yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={toolTipText} key="cart">
              <div key="cart" onClick={addToCartHandler}>
                <ShoppingCartOutlined className="text-success" /> <br />
                Add to Cart
              </div>
            </Tooltip>,
            <div onClick={addWishlist} key="wislist">
              <HeartOutlined />
              <br />
              Add to Wishlist
            </div>,
            <RatingModal setRating={sendRating} key="rating">
              <Rating
                ratingValue={selectedStar}
                onClick={(value) => setSelectedStar(value)}
              />
            </RatingModal>,
          ]}
        >
          <ProductRightInfo product={product} />
        </Card>
      </div>
    </>
  )
}

export default ProductInfoCard
