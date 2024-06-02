import mockuser from '../assets/mockuser'

const getPlans = async () => {
  return mockuser.plans
}

const getDepot = async () => {
  return mockuser.depot
}

const editProduct = async ({ id, product }) => {
  mockuser.depot.products = mockuser.depot.products.map((p) => {
    if (p.id === id) {
      return product
    }
    return p
  })
}

const delProduct = async ({ id }) => {
  mockuser.depot.products = await mockuser.depot.products.filter((product) => product.id !== id)
}

const getVehicles = async () => {
  return mockuser.vehicles
}

export default {
  getPlans,
  getDepot,
  editProduct,
  delProduct,
  getVehicles
}