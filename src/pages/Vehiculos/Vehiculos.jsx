import users from "../../services/users"
import CrudTable from "../../components/CrudTable/CrudTable"
import { useState, useEffect } from 'react'
import classes from './Vehiculos.module.css'

const Vehiculos = () => {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const fetchDepot = async () => {
      const newVehicles = await users.getVehicles()
      setVehicles(newVehicles)
    }
    fetchDepot()
  }, [])

  return (
    <div className={classes.main}>
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
        minWidth={450}
      />
    </div>
  )
}

export default Vehiculos
