import React from 'react'
import PrivateAdminAuth from '../../auth/privateAdminAuth'
import AdminNav from '../../components/AdminNav'

const Dashboard = () => {
  return (
    <PrivateAdminAuth>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <div className="row">Your Dashboard</div>
          </div>
        </div>
      </div>
      ;
    </PrivateAdminAuth>
  )
}

export default Dashboard
