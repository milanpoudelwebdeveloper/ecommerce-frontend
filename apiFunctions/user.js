import axios from 'axios'
export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const getCurrentUser = async (authToken) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/current-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}

export const getCurrentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API}/current-admin`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  )
}
