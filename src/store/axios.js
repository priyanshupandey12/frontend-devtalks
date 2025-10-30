
import axios from "axios";
import store from "./store"; 
import { logout } from "./userSlice"; 
import { BASE_URL } from '../store/constant';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

const PUBLIC_ROUTES = ["/login", "/signup"];

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

function addSubscriber(callback) {
  refreshSubscribers.push(callback);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
  const originalRequest = error.config;


    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const requestUrl = originalRequest.url;

     if (status === 401 && !PUBLIC_ROUTES.some((route) => requestUrl.includes(route))) {
      if (isRefreshing) {
   
        return new Promise((resolve) => {
          addSubscriber(() => resolve(api(originalRequest)));
        });
      }

       originalRequest._retry = true;
      isRefreshing = true;

      try {
   
        await axios.post(`${BASE_URL}/users/refresh-token`, {}, { withCredentials: true });
      isRefreshing = false;
        onRefreshed();
        return api(originalRequest);
  
      } catch (refreshError) {
          isRefreshing = false;
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
