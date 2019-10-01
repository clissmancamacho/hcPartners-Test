'use strict'

/* Global Imports */
import express from 'express'
import { UserCtrl } from '../controllers'
import { isAuth } from '../middlewares'

/* Config Vars */
const api = express.Router()

/* * * * * * * Config Routes of User with Express Router * * + * * * * * * * * * * * * */
/* 1: Route string
*  2: Middleware to verified de JWT
*  4: Called of function of controller for this route
*/
api.get('/users', isAuth, UserCtrl.getUsers)
api.get('/user/:id', isAuth, UserCtrl.getUser)
api.put('/user/:id', isAuth, UserCtrl.updateUser)
api.delete('/user/:id', isAuth, UserCtrl.deleteUser)

// Relation TypeUser
api.get('/user/type/:id', isAuth, UserCtrl.getUserTypeById)
// All Users By TypeUser
api.get('/users/typeUser', isAuth, UserCtrl.getUserTypeUser)

export default api
