import { brands } from '../../data/productData'
import { Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'

interface props {
  setBrands: React.Dispatch<React.SetStateAction<IProductSearch>>
}

const BrandsFilter: React.FC<props> = ({ setBrands }) => {
  const [value, setValue] = useState('')
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    setBrands((prevState) => ({
      ...prevState,
      selectedBrand: e.target.value,
    }))
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical" className="p-4">
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
