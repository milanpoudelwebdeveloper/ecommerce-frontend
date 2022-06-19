import axios from 'axios'

export const uploadImage = async (image: any, authToken: string | null) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/uploadimages`,
    { image: image },
    {
      headers: {
        authToken: authToken as string,
      },
    }
  )
}

export const deleteImage = async (imageId: string, authToken: string) => {
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
