import axios from "axios"

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))
}

const generateHeaders = () => {
  const user = getToken()
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user ? user.token : null}`
    }
  }
}

export default class API {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL
  }

  get(endPoint) {
    return axios.get(`${this.baseUrl}/${endPoint}`, generateHeaders())
  }

  post(endPoint, body) {
    return axios.post(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  put(endPoint, body) {
    return axios.put(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  patch(endPoint, body) {
    return axios.patch(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  delete(endPoint) {
    return axios.delete(`${this.baseUrl}/${endPoint}`, generateHeaders())
  }
}
