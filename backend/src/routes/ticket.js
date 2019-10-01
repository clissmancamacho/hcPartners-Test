'use strict'

/* Global Imports */
import express from 'express'
import { TicketCtrl } from '../controllers'
import { isAuth } from '../middlewares'

/* Config Vars */
const api = express.Router()

/* * * * * * * Config Routes of User with Express Router * * + * * * * * * * * * * * * */
/* 1: Route string
*  2: Middleware to verified de JWT
*  4: Called of function of controller for this route
*/
api.post('/ticket', isAuth, TicketCtrl.saveTicket)
api.get('/tickets', isAuth, TicketCtrl.getTickets)
api.get('/ticket/:id', isAuth, TicketCtrl.getTicket)
api.get('/tickets/user/:id', isAuth, TicketCtrl.getTicketsByUser)
api.put('/ticket/:id', isAuth, TicketCtrl.updateTicket)
api.delete('/ticket/:id', isAuth, TicketCtrl.deleteTicket)

export default api
