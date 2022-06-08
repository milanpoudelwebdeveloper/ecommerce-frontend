import { brands } from '../../data/productData'
import { Radio, Space } from 'antd'
import React, { useState } from 'react'

const BrandsFilter = ({ setBrands }) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
    setBrands((prevState) => ({
      ...prevState,
      selectedBrand: e.target.value,
    }))
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        {brands.map((o) => (
          <Radio value={o} key={o}>
            {o}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  )
}

export default BrandsFilter
