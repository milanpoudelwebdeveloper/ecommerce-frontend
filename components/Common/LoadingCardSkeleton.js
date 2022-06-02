import { Card, Skeleton } from 'antd'
import React from 'react'

const LoadingCardSkeleton = ({ count }) => {
  const cards = () => {
    let totalCards = []
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col m-3">
          <Skeleton active />
        </Card>
      )
    }
    return totalCards
  }
  return <div className="row pb-5">{cards()}</div>
}

export default LoadingCardSkeleton
