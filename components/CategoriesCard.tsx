import React from 'react'
import Link from 'next/link'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

//this component can be used both for categories and sub-categories

interface props {
  name: string
  id: string
  categoryDelete: any
  link: string
}

const CategoriesCard: React.FC<props> = ({
  name,
  id,
  categoryDelete,
  link,
}) => {
  return (
    <div
      className="alert alert-secondary"
      key={id}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      {name}
      <div>
        <span className="btn btn-sm float-right">
          <DeleteOutlined className="text-danger" onClick={categoryDelete} />
        </span>
        <Link href={link} passHref>
          <span className="btn btn-sm float-right">
            <EditOutlined className="text-warning" />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default CategoriesCard
