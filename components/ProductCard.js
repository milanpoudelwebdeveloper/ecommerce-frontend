import React from 'react'
import { Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ProductCard = ({ product, productDelete }) => {
  const { title, description, images, slug } = product
  const { Meta } = Card

  const user = useSelector((state) => state.user)
  const token = user.token

  const formattedDescription =
    description && description.length < 25
      ? description
      : `${description.substring(0, 25)}...`

  return (
    <Card
      hoverable
      actions={[
        <Link href={`/admin/product/${slug}`} passHref key="edit">
          <EditOutlined className="text=-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => productDelete(slug, token)}
          className="text-danger"
          key="delete"
        />,
      ]}
      cover={
        <img
          alt={title}
          src={
            images && images.length > 0
              ? images[0].url
              : 'https://via.placeholder.com/150'
          }
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
        />
      }
    >
      <Meta title={title} description={formattedDescription} />
    </Card>
  )
}

export default ProductCard
