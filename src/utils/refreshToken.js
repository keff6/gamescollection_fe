import authController from '../api/authController';

const refreshToken = async () => {
  try {
    const response = await authController.refreshToken();
    return response.data.accessToken
  } catch (e) {
    console.log({e})
  }
}

export default refreshToken