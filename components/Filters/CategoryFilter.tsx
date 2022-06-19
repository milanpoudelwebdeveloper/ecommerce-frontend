import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React from 'react'

interface props {
  categories: ICategory[]
  setCategories: React.Dispatch<React.SetStateAction<IProductSearch>>
  selectedCategories: string[]
}

const CategoryFilter: React.FC<props> = ({
  categories,
  setCategories,
  selectedCategories,
}) => {
  const handleCategories = (e: CheckboxChangeEvent) => {
    const categories = [...selectedCategories]

    //if found the element it returns the index otherwise -1
    let foundCategoryIndex = categories.indexOf(e.target.value)

    const NotFound = foundCategoryIndex === -1

    if (NotFound) {
      categories.push(e.target.value)
      setCategories((prevState) => ({
        ...prevState,
        selectedCategories: categories,
      }))
    } else {
      categories.splice(foundCategoryIndex, 1)
      setCategories((prevState) => ({
        ...prevState,
        selectedCategories: categories,
      }))
    }
  }
  return (
    <>
      {categories.map((c) => (
        <div key={c._id}>
          <Checkbox
            className="pb-2 pl-4 pr-4"
            onChange={handleCategories}
            value={c._id}
          >
            {c.name}
          </Checkbox>
        </div>
      ))}
    </>
  )
}

export default CategoryFilter
