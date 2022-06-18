import React from 'react'
import StarRating from 'react-star-ratings'

const StarRatings = ({ star, setStar }) => {
  return (
    <div className="ml-4 px-4">
      <StarRating
        changeRating={(rating) =>
          setStar((prevState) => ({
            ...prevState,
            star: rating,
          }))
        }
        rating={star}
        numberOfStars={5}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starRatedColor="red"
        starEmptyColor="gray"
      />
    </div>
  )
}

export default StarRatings
