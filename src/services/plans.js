import pb from "./pb"
import axios from 'axios'
import { getAuthUser } from "./authUser"

let plans = []

export const fetchPlans = async () => {
  plans = await pb
    .collection('plans')
    .getFullList({ filter: `user = "${getAuthUser().id}"` })
}

export const generatePlan = async (data) => {
  const res = axios.post(pb.baseUrl + '/generate', data)
  return res
}

export const getPlans = () => plans

export const findPlan = (id) => plans.find(p => p.id === id)

export const deletePlan = async (id) => {
  await pb.collection('plans').delete(id)
  plans = plans.filter(p => p.id !== id)
}