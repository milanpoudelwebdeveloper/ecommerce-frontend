import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const ImageCarousel = ({ images }) => {
  return (
    <Carousel showArrows={true} autoPlay infiniteLoop>
      {images?.map((i, index) => (
        <img src={i.url} alt={i} key={index} />
      ))}
    </Carousel>
  )
}

export default ImageCarousel
