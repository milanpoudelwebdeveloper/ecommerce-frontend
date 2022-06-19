import { Card, Skeleton } from 'antd'
import React from 'react'

const LoadingCardSkeleton: React.FC<{ count: number }> = ({ count }) => {
  const cards = () => {
    let totalCards = []
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col m-3" key={i}>
          <Skeleton active />
        </Card>
      )
    }
    return totalCards
  }
  return <div className="row pb-5">{cards()}</div>
}

export default LoadingCardSkeleton
