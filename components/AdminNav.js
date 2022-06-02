import React from 'react'
import Link from 'next/link'

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link href="/admin/dashboard" passHref>
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Dashboard
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin/product/create" passHref>
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Product
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin/listproducts" passHref className="nav-link">
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Products
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin/category" passHref className="nav-link">
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Category
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin/sub-category" passHref className="nav-link">
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Sub-Category
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/password" passHref className="nav-link">
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Password
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default AdminNav
