import pb from './pb'

let authUser = pb.authStore.model

export const authWithPassword = async (username, password) => {
  const response = { loggedInUser: null }
  try {
    const loggedInUser = await pb
      .collection('users')
      .authWithPassword(username, password, { expand: 'depot' }) 
    authUser = loggedInUser.record
    response.loggedInUser = loggedInUser.record
  }
  catch (error) {
    response.error = error
  }
  return response
}

export const clearAuth = () => {
  pb.authStore.clear()
}

export const autoRefresh = ({ onUserDelete }) => {
  pb.collection('users').subscribe(authUser.id, (e) => {
    if (e.action == "delete") {
      pb.authStore.clear();
      onUserDelete()
    } else {
      pb.authStore.save(pb.authStore.token, e.record);
    }
  })
}

export const getAuthUser = () => authUser

export const updateAuthUser = async (data) => {
  const updatedUser = await pb.collection('users').update(authUser.id, data)
  pb.authStore.save(pb.authStore.token, updatedUser)
  return updatedUser
}

export const getDepot = () => authUser.expand.depot

export const updateDepot = async (data) => {
  const updatedDepot = await pb.collection('depots').update(getDepot().id, data)
  authUser.expand.depot = updatedDepot
  pb.authStore.save(pb.authStore.token, authUser)
  return updatedDepot
}

export const getAvatar = () => {
  return pb.files.getUrl(authUser, authUser.avatar)
}