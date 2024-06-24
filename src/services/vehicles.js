import pb from "./pb"
import { getDepot } from "./authUser"

let vehicles = []

export const fetchVehicles = async () => {
  vehicles = await pb
    .collection('vehicles')
    .getFullList({ filter: `depot = "${getDepot().id}"` })
}

export const createVehicle = async (data) => {
  const newVehicle = await pb.collection('vehicles').create({
    depot: getDepot().id, ...data 
  })
  vehicles = [newVehicle, ...vehicles]
  return newVehicle
}

export const getVehicles = () => vehicles

export const updateVehicle = async (data) => {
  const updatedVehicle = await pb.collection('vehicles').update(data.id, data)
  vehicles = vehicles.map(p => p.id === data.id ? updatedVehicle : p)
  return updatedVehicle
}

export const deleteVehicle = async (id) => {
  await pb.collection('vehicles').delete(id)
  vehicles = vehicles.filter(p => p.id !== id)
}