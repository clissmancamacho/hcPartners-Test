import API from "../utils/api"

let api = new API()

export default {
  login: async user => {
    return new Promise((resolve, reject) => {
      api
        .post("auth/login", user)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  register(user) {
    return new Promise((resolve, reject) => {
      api
        .post("auth/register", user)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.log(error)
          reject(error.response.data)
        })
    })
  },

  logout() {
    localStorage.removeItem("user")
  },

  isLoggedIn() {
    const user = localStorage.getItem("user")
    if (user) return true
    return false
    
  },

  isAdmin() {
    const typeUser = JSON.parse(localStorage.getItem("user")).type_user
    if(typeUser.name === 'admin') return true
    return false
  }
}
