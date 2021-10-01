import axios from '../utils/axios';

class RecordTypeService {
  listRecordType = async (params) => {
    try {
      const response = await axios.get('/record_type', {
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

  getRecordType = async (id, { fields }) => {
    try {
      const response = await axios.get(`/record_type/${id}`, {
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

  createRecordType = async (payload) => {
    try {
      const response = await axios.post('/record_type', payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateRecordType = async (id, payload) => {
    try {
      const response = await axios.patch(`/record_type/${id}`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteRecordType = async (id) => {
    try {
      const response = await axios.delete(`/record_type/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const recordTypeService = new RecordTypeService();

export default recordTypeService;
