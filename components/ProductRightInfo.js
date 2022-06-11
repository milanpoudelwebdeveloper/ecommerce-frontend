import Link from 'next/link'
import React from 'react'

const ProductRightInfo = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product

  return (
    <ul className="list-group">
      <li
        className="list-group-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Price</p>
        <span className="label label-default label-pill pull-xs-right">
          ${price}
        </span>
      </li>
      {category && (
        <li
          className="list-group-item"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>Category</p>
          <div style={{ color: 'blue', cursor: 'pointer' }}>
            <Link href={`/category/${category.slug}`} passHref>
              <span>{category.name}</span>
            </Link>
          </div>
        </li>
      )}
      {subs && (
        <li
          className="list-group-item"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>Sub-Categories</p>
          <div
            style={{
              color: 'blue',
              cursor: 'pointer',
              display: 'flex',
              gap: '10px',
            }}
          >
            {subs.map((s) => (
              <Link href={`/subs/${s.slug}`} passHref key={s._id}>
                <span>{s.name}</span>
              </Link>
            ))}
          </div>
        </li>
      )}
      <li
        className="list-group-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Color</p>
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li
        className="list-group-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Shipping</p>
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li
        className="list-group-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Brand</p>
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li
        className="list-group-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Available</p>
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li
        className="list-group-item"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p>Sold</p>
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  )
}

export default ProductRightInfo
