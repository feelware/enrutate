import users from "../../services/users"
import CrudTable from "../../components/CrudTable/CrudTable"
import MapView from '../../components/MapView'
import { useState, useEffect } from 'react'
import classes from './Recursos.module.css'

const Recursos = () => {
  const [products, setProducts] = useState([])
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const fetchDepot = async () => {
      const { products } = await users.getDepot()
      setProducts(products)
    }
    const fetchVehicles = async () => {
      const vehicles = await users.getVehicles()
      setVehicles(vehicles)
    }
    fetchDepot()
    fetchVehicles()
  }, [])

  return (
    <div className={classes.main}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        gap: 30 
      }}>
        <MapView />
        <div style={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          width: '100%'
        }}>
          <CrudTable
            entityName="producto"
            head={['Nombre', 'Peso por unidad', 'Cantidad']}
            entries={products}
            colSelector={(product) => [
              product.name,
              product.unit_weight === 0 ? 'A granel' : `${product.unit_weight} kg`,
              `${product.amount}${product.unit_weight ? '' : ' kg'}`]
            }
            onEdit={async (product) => {
              console.log('Editing', product.name)
              await users.editProduct(product.id, product)
              const newProducts = products.map(p => p.id === product.id ? product : p)
              setProducts(newProducts)
            }}
            onDelete={async (product) => {
              console.log('Deleting', product.name)
              await users.delProduct(product.id)
              const newProducts = products.filter(p => p.id !== product.id)
              setProducts(newProducts)
            }}
            height="60%"
            flex={1}
          />
          <CrudTable
            entityName="vehículo"
            head={['Nombre', 'Instancias', 'Capacidad']}
            entries={vehicles}
            colSelector={(product) => [
              product.name,
              product.instances,
              `${product.capacity} kg`
            ]}
            onEdit={async (product) => {
              console.log('Editing', product.name)
              await users.editProduct(product.id, product)
              const newProducts = vehicles.map(p => p.id === product.id ? product : p)
              setVehicles(newProducts)
            }}
            onDelete={async (product) => {
              console.log('Deleting', product.name)
              await users.delProduct(product.id)
              const newProducts = vehicles.filter(p => p.id !== product.id)
              setVehicles(newProducts)
            }}
            height="30%"
            flex={1}
          />
        </div>
      </div>
    </div>
  )
}

export default Recursos
