import API from "../utils/api"

let api = new API()

export default {
  getUsersByTypeUser: async () => {
    return new Promise((resolve, reject) => {
      api
        .get(`users/typeUser`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  }
}
