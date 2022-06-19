import { NextPage } from 'next'
import React from 'react'

import PrivateAuth from '../../auth/privateAuth'
import UserNav from '../../components/Navs/UserNav'
import WishListCards from '../../components/Wishlist'

const WishList: NextPage = () => {
  return (
    <PrivateAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">
            <h4>WishList</h4>
            <WishListCards />
          </div>
        </div>
      </div>
    </PrivateAuth>
  )
}

export default WishList
