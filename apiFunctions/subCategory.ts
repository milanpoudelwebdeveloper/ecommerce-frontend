import axios from 'axios'

export const createSub = async (
  subCategory: {
    name: string
    parent: string
  },
  authToken: string
) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/sub`, subCategory, {
    headers: {
      authToken: authToken,
    },
  })
}
export const getSub = async (slug: string) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/sub/${slug}`)
}

export const getSubs = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/subs`)
}

export const updateSub = async (
  slug: string,
  subCategory: {
    name: string
    parent: string
  },
  authToken: string
) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API}/sub/${slug}`,
    subCategory,
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const deleteSub = async (slug: string, authToken: string) => {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API}/sub/${slug}`, {
    headers: {
      authToken: authToken,
    },
  })
}
