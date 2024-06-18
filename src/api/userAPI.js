import axiosClient from './axiosClient';

const userApi = {
  getAll: (params) => {
    const url = '/user';
    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },

  // Nếu api có gửi body kèm theo image/images lúc create thì dùng api như này.
  createUtensilWithImg: (payload) => {
    const url = '/news';
    return axiosClient.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // Nếu api chỉ có truyền mỗi body thì xài api này.
  createUser: (payload) => {
    const url = '/user';
    return axiosClient.post(url, payload);
  },

  deleteUser: (payload) => {
    const url = `/user?id=${payload}`;
    return axiosClient.delete(url);
  },

  updateUser: (payload) => {
    const url = `/user/update`;
    return axiosClient.put(url, payload);
  },
};

export default userApi;
