import React, { useState } from 'react'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Tooltip } from 'antd'
import Link from 'next/link'
import { getAverageRating } from '../utils/getAverageRating'
import { Rating } from 'react-simple-star-rating'
import _ from 'lodash'

const ProductCardHome = ({ product }) => {
  const { Meta } = Card
  const { title, slug, description, images, ratings, price } = product
  const [toolTip, setToolTip] = useState('Click to add')
  const averageRatings = ratings && getAverageRating(ratings)

  const handleAddToCart = () => {
    console.log('Adding to localStorage')
    //create cart array
    let cart = []
    if (typeof window !== undefined) {
      //if cart is in localStorage get it
      if (window.localStorage.getItem('ecommerce-cart')) {
        cart = JSON.parse(window.localStorage.getItem('ecommerce-cart'))
      }
      //if there is no item of that key in localStorage we set it
      //count for the default would be 1
      cart.push({
        ...product,
        count: 1,
      })

      //before saving to localStorage, we remove duplicates, we use loadash library for it
      let unique = _.uniqWith(cart, _.isEqual)
      // it compares and gives only products that are unique and we save it finally
      window.localStorage.setItem('ecommerce-cart', JSON.stringify(unique))
      setToolTip('Added')
    }
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
          <Tooltip title={toolTip} key="cart">
            <div onClick={() => handleAddToCart()}>
              <ShoppingCartOutlined key="shop" className="text-danger" />
              <br />
              Add to Cart
            </div>
            ,
          </Tooltip>,
        ]}
      >
        <Meta title={title} description={description}></Meta>
        <div className="h6 mt-4">Price: {price}</div>
      </Card>
    </>
  )
}

export default ProductCardHome
