import axios from '../utils/axios';

class RecordService {
  getWithBulkRecord = async (payload, { fields, record_fields }) => {
    try {
      const response = await axios.post('/record/bulk', payload, {
        params: { fields, record_fields },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getWithAnonymizeBulkRecord = async (payload, { fields, record_fields }) => {
    try {
      const response = await axios.post('/record/bulk/anonymize', payload, {
        params: { fields, record_fields },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getWithRedactBulkRecord = async (payload) => {
    try {
      const response = await axios.post('/record/bulk/redact', payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getWithDecryptBulkRecord = async (payload) => {
    try {
      const response = await axios.post('/record/bulk/decrypt', payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  createRecord = async (payload) => {
    try {
      const response = await axios.post('/record', payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getRecord = async (guid, { fields }) => {
    try {
      const response = await axios.get(`/record/${guid}`, {
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

  deleteRecord = async (guid) => {
    try {
      const response = await axios.delete(`/record/${guid}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateRecord = async (guid, payload) => {
    try {
      const response = await axios.patch(`/record/${guid}`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getWithAnonymizeRecord = async (guid, { fields }) => {
    try {
      const response = await axios.get(`/record/${guid}/anonymize`, {
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

  getWithRedactRecord = async (guid, { fields }) => {
    try {
      const response = await axios.get(`/record/${guid}/redact`, {
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

  getWithDecryptRecord = async (guid, { fields }) => {
    try {
      const response = await axios.get(`/record/${guid}/decrypt`, {
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

  importRecords = async (containerGuid, recordTypeId, payload) => {
    try {
      const response = await axios.post(`/container/${containerGuid}/${recordTypeId}/import`, {
        data: payload,
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  }

  createTagRecord = async (guid, payload) => {
    try {
      const response = await axios.post(`/record/${guid}/tag`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteTagRecord = async (guid, tag) => {
    try {
      const response = await axios.delete(`/record/${guid}/tag/${tag}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  createMetadataRecord = async (guid, payload) => {
    try {
      const response = await axios.post(`/record/${guid}/metadata`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updateMetadataRecord = async (guid, payload) => {
    try {
      const response = await axios.put(`/record/${guid}/metadata`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  deleteMetadataRecord = async (guid, key) => {
    try {
      const response = await axios.delete(`/record/${guid}/metadata/${key}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  listAllPermissionRecord = async ({
    limit, offset, sort, fields, filter,
  }) => {
    try {
      const response = await axios.get('/record/permission', {
        params: {
          limit, offset, sort, fields, filter,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  listPermissionRecord = async (guid, {
    limit, offset, sort, fields, filter,
  }) => {
    try {
      const response = await axios.get(`/record/${guid}/permission`, {
        params: {
          limit, offset, sort, fields, filter,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  createPermissionRecord = async (guid, payload) => {
    try {
      const response = await axios.post(`/record/${guid}/permission`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  getPermissionRecord = async (guid, id, { fields }) => {
    try {
      const response = await axios.get(`/record/${guid}/permission/${id}`, {
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

  deletePermissionRecord = async (guid, id) => {
    try {
      const response = await axios.delete(`/record/${guid}/permission/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };

  updatePermissionRecord = async (guid, id, payload) => {
    try {
      const response = await axios.patch(`/record/${guid}/permission/${id}`, payload);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      throw error;
    }
  };
}

const recordService = new RecordService();

export default recordService;
