/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';
import config from './index';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = config.apiUrl;
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
// axiosInstance.defaults.headers.common['x-forwarded-for'] = '10.11.12.16';

const defaultPrefix = '';

const setToken = (token, callback) => {
   if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
   } else {
      delete axiosInstance.defaults.headers.common.Authorization;
   }
};

export default {
   get: (url, params, prefix) => axiosInstance({
      method: 'get',
      url: `${prefix || defaultPrefix}${url}`,
      params,
   }),
   post: (url, data, params, prefix) => axiosInstance({
      method: 'post',
      url: `${prefix || defaultPrefix}${url}`,
      data,
      params,
   }),
   put: (url, data, params, prefix) => axiosInstance({
      method: 'put',
      url: `${prefix || defaultPrefix}${url}`,
      data,
      params,
   }),
   delete: (url, data, params, prefix) => axiosInstance({
      method: 'delete',
      url: `${prefix || defaultPrefix}${url}`,
      data,
      params
   }),
   download: (url, data, params, prefix) => axiosInstance({
      method: 'post',
      responseType: 'blob',
      url: `${prefix || defaultPrefix}${url}`,
      data,
      params,
   }),
   setToken,
};
