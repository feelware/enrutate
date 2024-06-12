import axios from 'axios'

const baseUrl = 'http://localhost:3001'

let currentUser = null

const setCurrentUser = (user) => {
  currentUser = user
}

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/users/${id}`)
  return res.data
}

const getPlans = async () => {
  const res = await axios.get(`${baseUrl}/plans?userId=${currentUser.id}`)
  return res.data
}

const getDepot = async () => {
  const depot = await axios.get(`${baseUrl}/depots/${currentUser.depotId}`)
  const vehicles = await axios.get(`${baseUrl}/vehicles?depotId=${currentUser.depotId}`)
  const products = await axios.get(`${baseUrl}/products?depotId=${currentUser.depotId}`)
  return {
    ...depot.data,
    vehicles: vehicles.data,
    products: products.data
  }
}

const getRoutesOf = async (planId) => {
  const routes = await axios.get(`${baseUrl}/routes?planId=${planId}`)
  const vehiclesMap = new Map()
  const productsMap = new Map()
  for (let route of routes.data) {
    let vehicle = vehiclesMap.get(route.vehicleId)
    if (!vehicle) {
      vehicle = await axios.get(`${baseUrl}/vehicles/${route.vehicleId}`)
      route.vehicle = vehicle.data
      vehiclesMap.set(route.vehicleId, vehicle.data)
    }
    else {
      route.vehicle = vehicle
    }

    
    const waypoints = await axios.get(`${baseUrl}/waypoints?routeId=${route.id}`)
    for (let waypoint of waypoints.data) {
      if (!waypoint.clientId) {
        continue
      }

      const client = await axios.get(`${baseUrl}/clients/${waypoint.clientId}`)
      waypoint.client = client.data
      
      const orders = await axios.get(`${baseUrl}/orders?waypointId=${waypoint.id}`)
      for (let order of orders.data) {
        const product = productsMap.get(order.productId)
        if (!product) {
          const product = await axios.get(`${baseUrl}/products/${order.productId}`)
          productsMap.set(order.productId, product.data)
        }
        order.product = product
      }
      waypoint.orders = orders.data
    }
    route.waypoints = waypoints.data
  }
  return routes.data
}

export default {
  setCurrentUser,
  getUser,
  getPlans,
  getDepot,
  getRoutesOf
}

