'use strict'

/* Global Imports */
import { dbTicket } from '../db-api/'
import { Success, Error } from '../util'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:controllers:ticket')

/* * * * * * * * * *  Controlller Functions * * * * * * * * * * * */

const getTickets = async (req, res) => {
  try {
    debug('getTickets')
    const tickets = await dbTicket.findAll()
    if (!tickets) return Error({ message: 'Ticket not found', status: 404 }, res)
    Success(res, { data: tickets, model: 'tickets' })
  } catch (error) {
    Error(error, res)
  }
}

const getTicket = async (req, res) => {
  try {
    const { id } = req.params
    debug('getTicket')
    const ticket = await dbTicket.findById(id)
    if (!ticket) return Error({ message: 'ticket not found', status: 404 }, res)
    Success(res, { data: ticket, model: 'ticket' })
  } catch (error) {
    Error(error, res)
  }
}

const saveTicket = async (req, res) => {
  try {
    debug('saveTicket')
    const objectTicket = req.body
    const ticket = await dbTicket.create(objectTicket)
    Success(res, { data: ticket, model: 'ticket' }, 201)
  } catch (error) {
    Error(error, res)
  }
}

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params
    const objectTicket = req.body
    debug('updateTicket')
    const ticket = await dbTicket.update(id, objectTicket)
    if (!ticket) return Error({ message: 'ticket not found', status: 404 }, res)
    Success(res, { data: ticket, model: 'ticket' })
  } catch (error) {
    Error(error, res)
  }
}

const deleteTicket = async (req, res) => {
  const { id } = req.params

  try {
    debug('deleteTicket')
    await dbTicket.delete(id)
    Success(res)
  } catch (error) {
    Error(error, res)
  }
}

const getTicketsByUser = async (req, res) => {
  const { id } = req.params

  try {
    debug('getTicketUser')
    const ticketsByUser = await dbTicket.findTicketsByUser(id)
    if (!ticketsByUser) return Error({ message: 'Tickets not found', status: 404 }, res)
    Success(res, { data: ticketsByUser, model: 'ticketsByUser' })
  } catch (error) {
    Error(error, res)
  }
}

export default {
  saveTicket,
  getTickets,
  getTicket,
  getTicketsByUser,
  updateTicket,
  deleteTicket
}
