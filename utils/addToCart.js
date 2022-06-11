import _ from 'lodash'

export const handleAddToCart = (product) => {
  //create cart array
  let cart = []
  if (typeof window !== undefined) {
    //if cart is in localStorage get it
    if (window.localStorage.getItem('ecommerce-cart')) {
      cart = JSON.parse(window.localStorage.getItem('ecommerce-cart'))
    }
    //if there is no item of that key in localStorage we set it
    //count for the default would be 1
    cart.push({
      ...product,
      count: 1,
    })
    //before saving to localStorage, we remove duplicates, we use loadash library for it
    let unique = _.uniqWith(cart, _.isEqual)
    // it compares and gives only products that are unique and we save it finally
    window.localStorage.setItem('ecommerce-cart', JSON.stringify(unique))
    return unique
  }
}
