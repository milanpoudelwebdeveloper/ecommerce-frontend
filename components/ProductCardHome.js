import React, { useState } from 'react'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import Link from 'next/link'
import { getAverageRating } from '../utils/getAverageRating'
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from 'react-redux'
import { addToCart } from '../app/cartSlice'
import { handleAddToCart } from '../utils/addToCart'
import { openDrawer } from '../app/drawerSlice'

const ProductCardHome = ({ product }) => {
  const { Meta } = Card
  const { title, slug, description, images, ratings, price } = product
  const [toolTip, setToolTip] = useState('Click to add')
  const averageRatings = ratings && getAverageRating(ratings)
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    const uniqueCartItems = handleAddToCart(product)
    dispatch(addToCart(uniqueCartItems))
    dispatch(openDrawer(true))
    setToolTip('Added')
  }
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
            style={{
              height: '250px',
              objectFit: 'cover',
              width: 'full',
              objectPosition: 'center',
            }}
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
          <Tooltip title={toolTip} key="cart">
            <div onClick={addToCartHandler}>
              <ShoppingCartOutlined key="shop" className="text-danger" />
              <br />
              Add to Cart
            </div>
            ,
          </Tooltip>,
        ]}
      >
        <Meta title={title} description={description}></Meta>
        <div className="h6 mt-4">Price: ${price}</div>
      </Card>
    </>
  )
}

export default ProductCardHome
