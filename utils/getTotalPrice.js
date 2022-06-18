export const getTotalPrice = (cartItems) => {
  let allProductArray = []
  cartItems.map(({ price, count }) => {
    const productTotal = price * count
    allProductArray.push(productTotal)
  })
  const total = allProductArray.reduce((prev, current) => prev + current, 0)
  return total
}
