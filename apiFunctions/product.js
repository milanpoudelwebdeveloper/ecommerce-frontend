import axios from 'axios'

export const createProduct = async (product, authToken) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/product`, product, {
    headers: {
      authToken: authToken,
    },
  })
}

//here we use count for the pagination
export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/products/${count}`)
}

export const deleteProduct = async (productSlug, authToken) => {
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API}/product/${productSlug}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

//get single product info

export const getProductInfo = async (slug) => {
  console.log('getting your product info')
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/product/${slug}`)
}

//update product

export const updateProduct = async (updateInformation, slug, authToken) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/product/${slug}`,
    updateInformation,
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const getProducts = async (sort, order, page) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/products`, {
    sort: sort,
    order: order,
    page: page,
  })
}

export const getTotalProductsCount = async () => {
  console.log('get total products count is running')
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/products/total`)
}

export const setRating = async (productId, authToken, star) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/product/star/${productId}`,
    {
      star: star,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}
