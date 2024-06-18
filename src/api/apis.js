/* eslint-disable no-restricted-syntax */
import axiosClient from './axiosClient';

const APIs_URL = {
  LOGIN: '/user/login',
  REGISTER: '/user',
};

export const loginAPI = async (data) => axiosClient.post(APIs_URL.LOGIN, data);
export const registerAPI = async (data) => axiosClient.post(APIs_URL.REGISTER, data);

export const convertToFormData = (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length && value[0] instanceof File) {
      value.forEach((file) => {
        formData.append(`${key}`, file);
      });
    } else if (value instanceof File) {
      formData.append(`${key}`, value);
    } else {
      formData.append(`${key}`, `${value}`);
    }
  }
  return formData;
};
