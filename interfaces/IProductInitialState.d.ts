interface IProductInitialState {
  title: string
  description: string
  price: Number
  categories: { _id: string; name: string; slug: string }[]
  category: '' | any
  subCategoriesList: { _id: string; name: string; slug: string }[]
  subs: { _id: string; name: string; slug: string }[]
  shipping: string
  quantity: number
  images: { public_id: string; url: string }[]
  color: string
  brand: string
}
