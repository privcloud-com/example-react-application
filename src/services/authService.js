import axios from '../utils/axios';

class AuthService {
  login = async ({ email, password }) => {
    try {
      const response = await axios.post('/login', { email, password });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  forgotPassword = async ({ email }) => {
    try {
      const response = await axios.post('/forgot-password', { email });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async ({ token, password }) => {
    try {
      const response = await axios.post('/reset-password', { token, password });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  logout = async () => {
    try {
      const response = await axios.post('/logout');
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
