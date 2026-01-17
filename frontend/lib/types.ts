export interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  categoryId: string
  category?: Category
  createdAt?: string
  updatedAt?: string
}
