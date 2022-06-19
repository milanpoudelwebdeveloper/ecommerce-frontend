import React from 'react'
import { Slider } from 'antd'

interface props {
  price: any
  setPrice: React.Dispatch<React.SetStateAction<IProductSearch>>
}

const PriceRange: React.FC<props> = ({ price, setPrice }) => {
  return (
    <div className="m-2">
      <Slider
        className="ml-4 mr-4 "
        tipFormatter={(v) => `$${v}`}
        range
        value={price}
        onChange={(value) =>
          setPrice((values) => ({ ...values, price: value }))
        }
        max={10000}
      />
    </div>
  )
}

export default PriceRange
