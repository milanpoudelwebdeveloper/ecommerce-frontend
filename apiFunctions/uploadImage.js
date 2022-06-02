import axios from 'axios'

export const uploadImage = async (image, authToken) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/uploadimages`,
    { image: image },
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const deleteImage = async (imageId, authToken) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/removeimage`,
    { imageId: imageId },
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}
