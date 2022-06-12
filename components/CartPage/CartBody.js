import React from 'react'
import ModalImage from 'react-modal-image-responsive'
import { colors } from '../../data/productData'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../app/cartSlice'

const CartBody = ({ cart }) => {
  const dispatch = useDispatch()
  const handleColorChange = (e, productId) => {
    let cartItems = [...cart]
    cart.map((item) => {
      if (item._id === productId) {
        let arrayIndex = cartItems.indexOf(item)
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
    console.log('hey final cart items are', cartItems)
  }
  return (
    <>
      {cart?.map(
        ({ _id, images, title, price, brand, color, count, shipping }) => (
          <tbody key={_id}>
            <tr>
              <td>
                <div style={{ width: '100px', height: 'auto' }}>
                  {images.length && (
                    <ModalImage
                      small={images[0].url}
                      large={images[0].url}
                      alt="Laptop Image"
                    />
                  )}
                </div>
              </td>
              <td>{title}</td>
              <td>{price}</td>
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
              <td>{count}</td>
              <td>{shipping}</td>
              <td>Delete</td>
            </tr>
          </tbody>
        )
      )}
    </>
  )
}

export default CartBody
