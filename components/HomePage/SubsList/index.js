import React, { useEffect, useState } from 'react'
import { getSubs } from '../../../apiFunctions/subCategory'
import Link from 'next/link'

const SubsList = () => {
  const [loading, setLoading] = useState(false)
  const [subs, setSubs] = useState([])

  useEffect(() => {
    loadSubs()
  }, [])

  const loadSubs = async () => {
    setLoading(true)
    try {
      const response = await getSubs()
      setSubs(response.data)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const showSubs = () => {
    return subs.map((s) => (
      <Link href={`/subs/${s.slug}`}>
        <div
          key={s._id}
          className="col btn btn-outline-primary btn-lg btn-block btn-raised m-3"
        >
          {s.name}
        </div>
      </Link>
    ))
  }
  return (
    <div className="container-fluid">
      <div
        className="jumbotron text-danger h1 text-center"
        style={{ padding: '20px', background: '#E9ECEF', width: '100%' }}
      >
        Sub-categories
      </div>
      <div className="row">
        {loading ? <h4 className="text-center">Loading....</h4> : showSubs()}
      </div>
    </div>
  )
}

export default SubsList
