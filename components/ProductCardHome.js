import React from 'react'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Link from 'next/link'
import { getAverageRating } from '../utils/getAverageRating'
import { Rating } from 'react-simple-star-rating'

const ProductCardHome = ({ product }) => {
  const { Meta } = Card
  const { title, slug, description, images, ratings } = product

  const averageRatings = ratings && getAverageRating(ratings)
  return (
    <>
      {ratings?.length > 0 ? (
        <div className="text-center pt-1 pb-3">
          <Rating
            ratingValue={averageRatings * 20}
            readonly
            fillColor="red"
            size={25}
          />
        </div>
      ) : (
        <div className="text-center pt-1 pb-3">No ratings yet</div>
      )}

      <Card
        cover={
          <img
            src={
              images && images.length > 0
                ? images[0].url
                : 'https://via.placeholder.com/150'
            }
            alt="product-photo"
            style={{ height: '150px', objectFit: 'cover', width: 'full' }}
            className="p-1"
          />
        }
        actions={[
          <Link key="view" href={`/product/${slug}`} passHref>
            <div>
              <EyeOutlined className="text-warning" />
              <br />
              <p>View Product</p>
            </div>
          </Link>,
          <>
            <ShoppingCartOutlined key="shop" className="text-danger" />
            <br />
            Add to Cart
          </>,
        ]}
      >
        <Meta title={title} description={description}></Meta>
      </Card>
    </>
  )
}

export default ProductCardHome
