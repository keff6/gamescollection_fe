export const getAuthUser = (user = null) => {
  if(user) return user
  
  return JSON.parse(sessionStorage.getItem('currentUser')) || null
}