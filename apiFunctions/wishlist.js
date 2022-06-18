import axios from 'axios'

export const addToWishList = async (productId, authToken) => {
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

export const getAllWishlists = async (authToken) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/user/wishlist`, {
    headers: {
      authToken: authToken,
    },
  })
}

//it is mainly remove the item from the wishlist
export const updateWishList = async (productId, authToken) => {
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
