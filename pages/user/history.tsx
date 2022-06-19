import { NextPage } from 'next'
import React from 'react'
import PrivateAuth from '../../auth/privateAuth'
import UserNav from '../../components/Navs/UserNav'

const History: NextPage = () => {
  return (
    <PrivateAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col">User History</div>
        </div>
      </div>
    </PrivateAuth>
  )
}

export default History
