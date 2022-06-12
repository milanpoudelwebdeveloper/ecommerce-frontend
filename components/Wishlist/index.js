import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllWishlists, updateWishList } from '../../apiFunctions/wishlist'
import { DeleteOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const WishListCards = () => {
  const [wishlists, setWishlists] = useState([])

  const user = useSelector((state) => state.user)

  useEffect(() => {
    loadAllWishlists()
  }, [user.token])

  const loadAllWishlists = async () => {
    try {
      const response = await getAllWishlists(user.token)
      console.log(response.data)
      setWishlists(response.data.wishlist)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteWishlist = async (productId) => {
    try {
      const response = await updateWishList(productId, user.token)
      toast.success(response.data)
      loadAllWishlists()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {wishlists.length > 0 ? (
        wishlists?.map((w) => (
          <div
            key={w._id}
            className="alert alert-secondary"
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'space-between',
            }}
          >
            <Link href={`/product/${w.slug}`} passHref>
              {w.title}
            </Link>
            <span className="btn btn-sm float-right">
              <DeleteOutlined
                className="text-danger"
                onClick={() => deleteWishlist(w._id)}
              />
            </span>
          </div>
        ))
      ) : (
        <p>There are currently no items in your wishlists. Please add some</p>
      )}
    </>
  )
}

export default WishListCards
