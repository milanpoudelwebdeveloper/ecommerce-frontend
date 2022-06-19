interface ICart {
  _id: string
  title: string
  category: {}
  slug: string
  subs: []
  description: string
  brand: string
  color: string
  images: [{ url: string }]
  price: number
  quantity: number
  ratings: []
  shipping: string
  sold: number
  count: number
}
