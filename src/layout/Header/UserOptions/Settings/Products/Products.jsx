import CrudTable from "../../../../../components/CrudTable"

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../../../services/products"

import { useState } from "react"
import { isInRange } from '@mantine/form'

const Products = () => {
  const [products, setProducts] = useState(getProducts())

  return (
    <>
      <CrudTable
        name={'producto'}
        entries={products}
        attributes={({
          name: {
            type: 'string',
            selector: (product) => product.name,
            label: 'Nombre',
            placeholder: 'Nombre del producto',
            filter: true,
            required: true,
          },
          unit_weight: {
            type: 'number',
            selector: (product) => product.unit_weight,
            label: 'Peso unitario (kg)',
            placeholder: 10,
            required: true,
            validate: isInRange({ min: 0 }, 'El peso unitario debe ser mayor a 0'),
          }
        })}
        onCreate={async (product) => {
          const newProduct = await createProduct(product)
          setProducts([newProduct, ...products])
        }}
        onUpdate={async (product) => {
          const updatedProduct = await updateProduct(product)
          const newProducts = products.map(p => p.id === product.id ? updatedProduct : p)
          setProducts(newProducts)
        }}
        onDelete={async (product) => {
          await deleteProduct(product.id)
          const newProducts = products.filter(p => p.id !== product.id)
          setProducts(newProducts)
        }}
        filterCol='name'
      />
    </>
  )
}

export default Products