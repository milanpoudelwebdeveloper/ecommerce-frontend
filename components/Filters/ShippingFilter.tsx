import { shippingOptions } from '../../data/productData'

import { Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'

interface props {
  setShipping: React.Dispatch<React.SetStateAction<IProductSearch>>
}

const ShippingFilter: React.FC<props> = ({ setShipping }) => {
  const [value, setValue] = useState(shippingOptions[0])

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    setShipping((prevState) => ({
      ...prevState,
      selectedShipping: e.target.value,
    }))
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical" className="px-4">
        {shippingOptions.map((o) => (
          <Radio value={o} key={o}>
            {o}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  )
}

export default ShippingFilter
