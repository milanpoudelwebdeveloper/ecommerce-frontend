import { shippingOptions } from '../../data/productData'

import { Radio, Space } from 'antd'
import React, { useState } from 'react'

const ShippingFilter = ({ setShipping }) => {
  const [value, setValue] = useState(shippingOptions[0])

  const onChange = (e) => {
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
