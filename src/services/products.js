import pb from "./pb"
import { getDepot } from "./authUser"

let products = []

export const fetchProducts = async () => {
  products = await pb
    .collection('products')
    .getFullList({ filter: `depot = "${getDepot().id}"` })
}

export const createProduct = async (data) => {
  const newProduct = await pb.collection('products').create({
    depot: getDepot().id, ...data 
  })
  products = [newProduct, ...products]
  return newProduct
}

export const getProducts = () => products

export const updateProduct = async (data) => {
  const updatedProduct = await pb.collection('products').update(data.id, data)
  products = products.map(p => p.id === data.id ? updatedProduct : p)
  return updatedProduct
}

export const deleteProduct = async (id) => {
  await pb.collection('products').delete(id)
  products = products.filter(p => p.id !== id)
}