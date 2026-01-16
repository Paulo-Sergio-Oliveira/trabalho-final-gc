import type { Category, Product } from "./types"

export const categories: Category[] = [
  { id: "1", name: "Ursos" },
  { id: "2", name: "Coelhos" },
  { id: "3", name: "Gatos" },
  { id: "4", name: "Cachorros" },
  { id: "5", name: "Fantasia" },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Urso Fofinho",
    price: 24.99,
    image: "/cute-brown-teddy-bear-plush.jpg",
    categoryId: "1",
  },
  {
    id: "2",
    name: "Coelho de Algodão",
    price: 19.99,
    image: "/soft-white-bunny-plush-toy.jpg",
    categoryId: "2",
  },
  {
    id: "3",
    name: "Gato Aconchegante",
    price: 22.99,
    image: "/adorable-gray-cat-plush.jpg",
    categoryId: "3",
  },
  {
    id: "4",
    name: "Cachorrinho Amigo",
    price: 26.99,
    image: "/cute-golden-retriever-puppy-plush.jpg",
    categoryId: "4",
  },
  {
    id: "5",
    name: "Unicórnio dos Sonhos",
    price: 29.99,
    image: "/magical-pastel-unicorn-plush.jpg",
    categoryId: "5",
  },
  {
    id: "6",
    name: "Urso Mel",
    price: 23.99,
    image: "/honey-colored-teddy-bear-plush.jpg",
    categoryId: "1",
  },
  {
    id: "7",
    name: "Coelho Rosa",
    price: 21.99,
    image: "/pink-fluffy-bunny-plush.jpg",
    categoryId: "2",
  },
  {
    id: "8",
    name: "Gato Smoking",
    price: 24.99,
    image: "/black-and-white-tuxedo-cat-plush.jpg",
    categoryId: "3",
  },
]
