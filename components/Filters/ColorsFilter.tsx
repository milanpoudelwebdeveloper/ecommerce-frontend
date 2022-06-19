import { colors } from '../../data/productData'
import { Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'

interface props {
  setColors: React.Dispatch<React.SetStateAction<IProductSearch>>
}

const ColorsFilter: React.FC<props> = ({ setColors }) => {
  const [value, setValue] = useState('')
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    setColors((prevState) => ({
      ...prevState,
      selectedColor: e.target.value,
    }))
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical" className="p-4">
        {colors.map((o) => (
          <Radio value={o} key={o}>
            {o}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  )
}

export default ColorsFilter
