import { useState } from "react"
import { Table, ActionIcon } from "@mantine/core"
import { IconEdit, IconTrash } from '@tabler/icons-react'
import classes from './ProductsTable.module.css'

const ProductsTable = ({ products, handlers }) => {
  const [filter, setFilter] = useState('')

  const data = {
    head: ['Nombre', 'Peso por unidad', 'Cantidad'],
    body: products
      .filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
      .map((product) => [
        product.name,
        product.unit_weight === 0 ? 'A granel' : `${product.unit_weight} kg`,
        `${product.amount}${product.unit_weight ? '' : ' kg'}`,
        <div key={product.id} style={{ display: 'flex', gap: 10 }}>
          <ActionIcon 
            size='xs'
            variant="transparent"
            color="gray"
            title="Editar"
            onClick={() => handlers.onEdit(product)}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size='xs'
            variant="transparent"
            color="gray"
            title="Eliminar"
            onClick={() => handlers.onDelete(product)}
          >
            <IconTrash />
          </ActionIcon>
        </div>
      ])
  }

  return (
    <div className={classes.main}>
      {/* <HeaderSearch 
        title="Productos"
        filter={filter} 
        setFilter={setFilter}
        placeholder="Buscar producto" 
      /> */}
      <Table data={data} />
    </div>
  )
}

export default ProductsTable