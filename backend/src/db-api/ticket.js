'use strict'

/* Global Imports */
import Debug from 'debug'
import { Ticket, User } from '../models'
import { Sequelize } from 'sequelize'

/* Config vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:db-api:ticket')

export default {

  findAll: () => {
    debug('findAll Ticket')
    const tickets = Ticket.findAll({
      attributes: ['id', 'requested_ticket', 'userId'],
      include: [
        {
          model: User,
          where: { id: Sequelize.col('ticket.userId') },
          attributes: ['id', 'name', 'email']
        }
      ]
    })
    return tickets
  },

  findById: (id) => {
    debug('findByID Ticket')
    const ticket = Ticket.findOne({
      where: {
        id
      },
      attributes: ['id', 'requested_ticket', 'userId']
    })
    return ticket
  },

  create: (objectTicket) => {
    debug('Create Ticket')
    const ticket = new Ticket(objectTicket)
    return ticket.save()
  },

  update: async (id, ticket) => {
    debug('Update Ticket')
    let ticketToUpdate = await Ticket.findOne({
      where: {
        id
      },
      attributes: ['id', 'requested_ticket', 'userId']
    })
    if (ticketToUpdate) {
      return ticketToUpdate.update(ticket)
    }
    return false
  },

  delete: async (id) => {
    debug('Delete Ticket')
    const ticketToDelete = await Ticket.findByPk(id)
    if (ticketToDelete) {
      return ticketToDelete.destroy()
    }
    return false
  },

  findTicketsByUser: (userId) => {
    debug('findTicketUser')
    const ticket = Ticket.findAll({
      where: {
        userId
      },
      attributes: ['id', 'requested_ticket'],
      include: [
        {
          model: User,
          where: { id: Sequelize.col('ticket.userId') },
          attributes: ['id', 'name', 'email']
        }
      ]
    })
    return ticket
  }
}
