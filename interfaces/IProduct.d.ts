interface IProduct {
  _id?: string
  title: string
  category: { _id: string; slug: string; name: string } | ''
  slug?: string
  subs: { _id: string; slug: string; name: string }[]
  description: string
  brand: string
  color: string
  images: { url: string; public_id: string }[]
  price: Number
  quantity: Number
  ratings: []
  shipping: string
  sold?: Number
}
