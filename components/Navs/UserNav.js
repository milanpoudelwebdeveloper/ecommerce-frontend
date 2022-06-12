import React from 'react'
import Link from 'next/link'

const UserNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link href="/user/history" passHref>
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              History
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/password" passHref>
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              Password
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/wishlist" passHref className="nav-link">
            <p className="my-2" style={{ cursor: 'pointer', color: 'blue' }}>
              wishlist
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
