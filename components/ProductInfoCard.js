import React, { useState } from 'react'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Link from 'next/link'
import ImageCarousel from './Common/ImageCarousel'
import ProductRightInfo from './ProductRightInfo'
import { Rating } from 'react-simple-star-rating'
import RatingModal from './RatingModal'
import { setRating } from '../apiFunctions/product'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAverageRating } from '../utils/getAverageRating'

const { TabPane } = Tabs

const ProductInfoCard = ({ product }) => {
  const user = useSelector((state) => state.user)
  const { title, description, images, _id, ratings } = product

  const [selectedStar, setSelectedStar] = useState(0)

  const sendRating = async () => {
    try {
      const realStar = selectedStar / 20
      const response = await setRating(_id, user.token, realStar)
      toast.success(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('Ratings are', ratings)

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
            <div key="cart">
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </div>,
            <Link href="/" passHref key="wishlist">
              <div>
                <HeartOutlined />
                <br />
                Add to Wishlist
              </div>
            </Link>,
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
