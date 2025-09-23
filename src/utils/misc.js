export const getAuthUser = (user = null) => {
  if(user) return user
  
  return JSON.parse(sessionStorage.getItem('currentUser')) || null
}

export const getErrorMessage = (error = null) => {
  const message = error?.response?.data || error.message || "";
  return message;
}