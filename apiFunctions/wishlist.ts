import axios from 'axios'

export const addToWishList = async (productId: string, authToken: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/user/wishlist`,
    {
      productId: productId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const getAllWishlists = async (authToken: string) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/user/wishlist`, {
    headers: {
      authToken: authToken,
    },
  })
}

//it is mainly remove the item from the wishlist
export const updateWishList = async (productId: string, authToken: string) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/user/wishlist/${productId}`,
    {
      productId: productId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}
