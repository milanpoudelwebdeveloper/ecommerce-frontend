import axios from 'axios'

export const createProduct = async (product: IProduct, authToken: string) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/product`, product, {
    headers: {
      authToken: authToken,
    },
  })
}

//here we use count for the pagination
export const getProductsByCount = async (count: Number) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/products/${count}`)
}

export const deleteProduct = async (productSlug: string, authToken: string) => {
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

export const getProductInfo = async (slug: string) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/product/${slug}`)
}

//update product

export const updateProduct = async (
  updateInformation: IProduct | any,
  slug: string,
  authToken: string
) => {
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

export const getProducts = async (
  sort: string,
  order: string,
  page: Number
) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/products`, {
    sort: sort,
    order: order,
    page: page,
  })
}

export const getTotalProductsCount = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/products/total`)
}

export const setRating = async (
  productId: string,
  authToken: string,
  star: Number
) => {
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

export const fetchProductsByFilter = async (arg: IProductSearch) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/search/filters`, arg)
}
