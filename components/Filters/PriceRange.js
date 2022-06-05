import React from 'react'
import { Slider } from 'antd'

const PriceRange = ({ price, setPrice }) => {
  return (
    <div>
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
