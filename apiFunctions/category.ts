import axios from 'axios'

export const getCategories = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/categories`)
}

export const getCategory = async (slug: string) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/category/${slug}`)
}

export const deleteCategory = async (slug: string, authToken: string) => {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API}/category/${slug}`, {
    headers: {
      authToken: authToken,
    },
  })
}

//we have to evem send category itself to update it
export const updateCategory = async (
  slug: string,
  category: { name: string },
  authToken: string
) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/category/${slug}`,
    category,
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const createCategory = async (
  category: {
    name: string
  },
  authToken: string
) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/category`, category, {
    headers: {
      authToken: authToken,
    },
  })
}

//getting Subcategories based on category

export const getCategorySubs = async (categoryId: string | any) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API}/category/subs/${categoryId}`
  )
}
