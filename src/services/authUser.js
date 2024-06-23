import pb from './pb'

const authUser = pb.authStore.model

export const authWithPassword = async (username, password) => {
  const response = { loggedInUser: null }
  try {
    const loggedInUser = await pb.collection('users').authWithPassword(username, password)
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

export const autoRefresh = (logout) => {
  pb.collection('users').subscribe(authUser.id, (e) => {
    if (e.action == "delete") {
      pb.authStore.clear();
      logout()
    } else {
      pb.authStore.save(pb.authStore.token, e.record);
    }
  })
}

export const getAvatar = () => {
  return pb.files.getUrl(authUser, authUser.avatar)
}

export default authUser