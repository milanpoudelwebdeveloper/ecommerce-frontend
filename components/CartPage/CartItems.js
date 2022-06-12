import React from 'react'
import ModalImage from 'react-modal-image-responsive'

const CartItems = ({ cart }) => {
  return (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
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
              <td>{color}</td>
              <td>{count}</td>
              <td>{shipping}</td>
              <td>Delete</td>
            </tr>
          </tbody>
        )
      )}
    </table>
  )
}

export default CartItems
