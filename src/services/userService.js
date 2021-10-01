import axios from '../utils/axios';

class UserService {
  listUser = async (params) => {
    try {
      const response = await axios.get('/user', {
        params,
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getUser = async (id, { fields }) => {
    try {
      const response = await axios.get(`/user/${id}`, {
        params: { fields },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  createUser = async (payload) => {
    try {
      const response = await axios.post('/user', {
        data: payload,
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (id, payload) => {
    try {
      const response = await axios.patch(`/user/${id}`, {
        data: payload,
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/user/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const userService = new UserService();

export default userService;
