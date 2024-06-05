import axios from 'axios'

const baseUrl = 'http://localhost:3000'

let currentUser = null

const setCurrentUser = (user) => {
  currentUser = user
}

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

/* 
const getPlans = async () => {
  return mockuser.plans
}

const getDepot = async () => {
  return mockuser.depot
}

const editProduct = async ({ id, product }) => {
  console.log({ id, product })
}

const delProduct = async ({ id }) => { 
  console.log({ id })
}

const getVehicles = async () => {
  return mockuser.vehicles
}
*/

const getMockUser = async() => {
  const res = await axios.get(`${baseUrl}/users/0`)
  return res.data[0]
}

const getPlans = async () => {
  const res = await axios.get(`${baseUrl}/plans?userId=${currentUser.id}`)
  return res.data
}

const extendPlan = async (planId) => {
  const clients = []
  const routes = await axios.get(`${baseUrl}/routes?planId=${planId}`)
  
}

export default {
  getPlans,
  // getDepot,
  // editProduct,
  // delProduct,
  // getVehicles,
  setCurrentUser,
  getMockUser
}