export const getErrorMessage = (error = null) => {
  const message = error?.response?.data || error.message || "";
  return message;
}