import { colors } from '../../data/productData'
import { Radio, Space } from 'antd'
import React, { useState } from 'react'

const ColorsFilter = ({ setColors }) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
    setColors((prevState) => ({
      ...prevState,
      selectedColor: e.target.value,
    }))
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
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
