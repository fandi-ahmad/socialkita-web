import axios from "axios";
const apiUrl = 'http://localhost:8000/api/v1/auth'


const callApi = (method, url, data = null) => {
  return axios[method](url, data, {
    withCredentials: true,
  })
  .then(response => response.data)
  .catch(error => error.response);
};

export const GetAllUser = () => {
  return axios.get(`${apiUrl}/user`, {
    withCredentials: true,
  })
  .then(response => response.data)
  .catch(error => error.response)
};

export const LoginUser = (data) => {
  return callApi('post', `${apiUrl}/login`, data)
}

export const LogoutUser = () => {
  return axios.delete(`${apiUrl}/logout`, {
    withCredentials: true,
  })
  .then(response => response.data)
  .catch(error => error.response)
};

export const GetUserLogin = () => {
  return axios.get(`${apiUrl}/user-login`, {
    withCredentials: true,
  })
  .then(response => response.data)
  .catch(error => error.response)
}