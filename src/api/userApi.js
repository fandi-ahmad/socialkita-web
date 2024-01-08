import axios from "axios";
const apiUrl = 'http://localhost:8000/api/v1/auth'
const apiUser = 'http://localhost:8000/api/v1/user'

const headers = () => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
}


const callApi = (method, url, data = null) => {
  return axios[method](url, data, {
    withCredentials: true,
  }, headers())
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

export const RegisterUser = (data) => {
  return axios.post(`${apiUrl}/register`, data)
  .then(response => response.data)
  .catch(error => error.response)
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

// ============== /user ============

export const GetUserProfile = (uuid) => {
  return axios.get(`${apiUser}/profile/${uuid}`, {
    withCredentials: true,
  })
  .then(response => response.data)
  .catch(error => error.response)
}

export const UpdateUserProfile = (data) => {
  return callApi('put', `${apiUser}/update`, data)
}

export const GetUserByUsername = (username) => {
  return callApi('get', apiUser + '/profile/username/' + username)
}