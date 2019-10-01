'use strict'

/* Global Imports */
import express from 'express'
import { TypeUserCtrl } from '../controllers'
import { isAuth } from '../middlewares'

/* Config Vars */
const api = express.Router()

/* * * * * * * Config Routes of User with Express Router * * + * * * * * * * * * * * * */
/* 1: Route string
*  2: Middleware to verified de JWT
*  4: Called of function of controller for this route
*/
api.post('/typeUser', isAuth, TypeUserCtrl.saveTypeUser)
api.get('/typesUsers', isAuth, TypeUserCtrl.getTypeUsers)
api.get('/typeUser/:id', isAuth, TypeUserCtrl.getTypeUser)
api.put('/typeUser/:id', isAuth, TypeUserCtrl.updateTypeUser)
api.delete('/typeUser/:id', isAuth, TypeUserCtrl.deleteTypeUser)

export default api
