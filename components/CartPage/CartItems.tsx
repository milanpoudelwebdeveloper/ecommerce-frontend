import React from 'react'

import CartBody from './CartBody'

const CartItems: React.FC<{ cart: ICart[] }> = ({ cart }) => {
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
      <CartBody cart={cart} />
    </table>
  )
}

export default CartItems
