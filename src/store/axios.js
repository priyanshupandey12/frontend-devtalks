
import axios from "axios";
import store from "./store"; 
import { refreshAccessToken, logout } from "./userSlice";
import {BASE_URL} from '../store/constant'

const api = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true 
});


api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.accessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
     
        const res = await axios.post(
          `${BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

    
        store.dispatch(refreshAccessToken(newAccessToken));

       
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
       
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
