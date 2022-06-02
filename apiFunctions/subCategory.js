import axios from 'axios'

export const createSub = async (subCategory, authToken) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API}/sub`, subCategory, {
    headers: {
      authToken: authToken,
    },
  })
}
export const getSub = async (slug) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/sub/${slug}`)
}

export const getSubs = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_API}/subs`)
}

export const updateSub = async (slug, subCategory, authToken) => {
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

export const deleteSub = async (slug, authToken) => {
  return await axios.delete(`${process.env.NEXT_PUBLIC_API}/sub/${slug}`, {
    headers: {
      authToken: authToken,
    },
  })
}
