import React from 'react'
import { colors } from '../../data/productData'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../app/cartSlice'
import { toast } from 'react-toastify'
import { CloseOutlined } from '@ant-design/icons'

interface props {
  cart: ICart[]
}

const CartBody: React.FC<props> = ({ cart }) => {
  const dispatch = useDispatch()
  const handleColorChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    productId: string
  ) => {
    //first we assign all cart items to new array
    let cartItems = [...cart]
    cart.map((item) => {
      //after mapping
      if (item._id === productId) {
        //we will find arrayIndex of that item which matches with productid we send
        let arrayIndex = cartItems.indexOf(item)

        //we will update that particular item with the help of index
        cartItems[arrayIndex] = {
          ...cartItems[arrayIndex],
          color: e.target.value,
        }
        dispatch(addToCart(cartItems))
        if (typeof window !== undefined) {
          window.localStorage.setItem(
            'ecommerce-cart',
            JSON.stringify(cartItems)
          )
        }
      }
    })
  }

  const handleCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    let cartItems: any[] = [...cart]
    cart.map((item) => {
      if (item._id === productId) {
        let foundElementIndex = cartItems.indexOf(item)
        cartItems[foundElementIndex] = {
          ...cartItems[foundElementIndex],
          count: e.target.value,
        }
        dispatch(addToCart(cartItems))
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('ecommerce-cart', JSON.stringify(cartItems))
      }
    })
  }

  const removeItemFromCart = (productId: string) => {
    let cartItems = [...cart]
    cart.map((item) => {
      if (item._id === productId) {
        //if found
        let foundElementIndex = cartItems.indexOf(item)

        console.log('found element index', foundElementIndex)
        //now delete
        cartItems.splice(foundElementIndex, 1)
      }

      //confusion here why sending  (cartItems) causes error
      //and spreading it doesn't
      dispatch(addToCart([...cartItems]))
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('ecommerce-cart', JSON.stringify(cartItems))
      }
    })
  }

  return (
    <>
      {cart?.map(
        ({
          _id,
          images,
          title,
          price,
          brand,
          color,
          count,
          shipping,
          quantity,
        }) => (
          <tbody key={_id}>
            <tr>
              <td>
                <div style={{ width: '100px', height: 'auto' }}>
                  {images.length && (
                    <img src={images[0].url} alt="Laptop Image" />
                  )}
                </div>
              </td>
              <td>{title}</td>
              <td>{String(price)}</td>
              <td>{brand}</td>
              <td>
                <select
                  onChange={(e) => handleColorChange(e, _id)}
                  name="color"
                  className="form-control"
                  defaultValue={color}
                >
                  {colors.map((c) => (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  min={1}
                  max={quantity as any}
                  defaultValue={count as any}
                  className="form-control"
                  type="number"
                  onChange={(e) => {
                    if (count > quantity) {
                      toast.error(`Max available quantity, ${quantity}`)
                      return
                    }
                    if (count >= 1) {
                      handleCountChange(e, _id)
                    }
                  }}
                />
              </td>
              <td>{shipping}</td>
              <td>
                <CloseOutlined
                  onClick={() => removeItemFromCart(_id)}
                  className="text-danger"
                >
                  Delete
                </CloseOutlined>
              </td>
            </tr>
          </tbody>
        )
      )}
    </>
  )
}

export default CartBody