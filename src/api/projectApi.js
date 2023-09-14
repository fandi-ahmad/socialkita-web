import axios from "axios";
const apiProject = 'http://localhost:8000/api/v1/project'

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

const callApiGet = (url) => {
  return axios.get(url, {
    withCredentials: true,
  })
  .then(response => response.data)
  .catch(error => error.response);
};


export const CreateProject = (data) => {
  return callApi('post', `${apiProject}/create`, data)
}

export const GetProjectListByUser = (uuid) => {
  return callApiGet(`${apiProject}/${uuid}`)
}