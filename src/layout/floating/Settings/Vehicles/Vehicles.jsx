import CrudTable from "../../../../components/CrudTable"

import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../../../services/vehicles"

import { useState } from "react"
import { isInRange } from '@mantine/form'

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(getVehicles())

  return (
    <>
      <CrudTable
        name={'vehículo'}
        entries={vehicles}
        attributes={({
          name: {
            label: 'Nombre',
            placeholder: 'Nombre del vehículo',
            selector: (vehicle) => vehicle.name,
            type: 'string',
            filter: true,
            required: true
          },
          capacity: {
            label: 'Capacidad (kg)',
            placeholder: 1000,
            selector: (vehicle) => vehicle.capacity,
            type: 'number',
            required: true,
            validate: isInRange({ min: 0 }, 'La capacidad debe ser mayor a 0'),
          },
          instances: {
            label: 'Instancias',
            placeholder: 1,
            selector: (vehicle) => vehicle.instances,
            type: 'number',
            required: true,
            validate: isInRange({ min: 0 }, 'Las instancias deben ser mayor a 0'),
          }
        })}
        onCreate={async (vehicle) => {
          const newVehicle = await createVehicle(vehicle)
          setVehicles([newVehicle, ...vehicles])
        }}
        onUpdate={async (vehicle) => {
          const updatedVehicle = await updateVehicle(vehicle)
          const newVehicles = vehicles.map(p => p.id === vehicle.id ? updatedVehicle : p)
          setVehicles(newVehicles)
        }}
        onDelete={async (vehicle) => {
          await deleteVehicle(vehicle.id)
          const newVehicles = vehicles.filter(p => p.id !== vehicle.id)
          setVehicles(newVehicles)
        }}
        filterCol='name'
      />
    </>
  )
}

export default Vehicles