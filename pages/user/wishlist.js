import React from 'react'

import PrivateAuth from '../../auth/privateAuth'
import UserNav from '../../components/UserNav'

const WishList = () => {
  return (
    <PrivateAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">Your WishList</div>
        </div>
      </div>
    </PrivateAuth>
  )
}

export default WishList
