import axios from '../utils/axios';

class ContainerService {
  listContainer = async (params) => {
    try {
      const response = await axios.get('/container', {
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

  getContainer = async (guid, { fields }) => {
    try {
      const response = await axios.get(`/container/${guid}`, {
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

  createContainer = async (payload) => {
    try {
      const response = await axios.post('/container', {
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

  updateContainer = async (guid, payload) => {
    try {
      const response = await axios.patch(`/container/${guid}`, {
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

  deleteContainer = async (guid) => {
    try {
      const response = await axios.delete(`/container/${guid}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  listRecordsContainer = async (guid) => {
    try {
      const response = await axios.get(`/container/${guid}/records`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const containerService = new ContainerService();

export default containerService;
