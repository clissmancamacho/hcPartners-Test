import API from "../utils/api"

let api = new API()

export default {
  getTickets: async () => {
    return new Promise((resolve, reject) => {
      api
        .get(`tickets`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  getTicketsByUser: async user => {
    return new Promise((resolve, reject) => {
      api
        .get(`tickets/user/${user.id}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },

  saveTicket(ticket) {
    return new Promise((resolve, reject) => {
      api
        .post(`ticket`, ticket)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.log(error)
          reject(error.response.data)
        })
    })
  },

  updateTicket(ticket) {
    return new Promise((resolve, reject) => {
      api
        .put(`ticket/${ticket.id}`, ticket)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.log(error)
          reject(error.response.data)
        })
    })
  },

  deleteTicket(ticket) {
    return new Promise((resolve, reject) => {
      api
        .delete(`ticket/${ticket.id}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.log(error)
          reject(error.response.data)
        })
    })
  }
}
