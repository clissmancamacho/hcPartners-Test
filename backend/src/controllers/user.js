'use strict'

/* Global Imports */
import { dbUser } from '../db-api/'
import { Success, Error } from '../util'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:controllers:user')

/* * * * * * * * * *  Controlller Functions * * * * * * * * * * * */

const getUsers = async (req, res) => {
  try {
    const users = await dbUser.findAll()
    if (!users) return Error({ message: 'Users not found', status: 404 }, res)
    Success(res, { data: users, model: 'users' })
  } catch (error) {
    Error(error, res)
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    debug('getUser')
    const user = await dbUser.findById(id)
    if (!user) return Error({ message: 'User not found', status: 404 }, res)
    Success(res, { data: user, model: 'user' })
  } catch (error) {
    Error(error, res)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const objectUser = req.body
    debug('updateUser')
    const user = await dbUser.update(id, objectUser)
    if (!user) return Error({ message: 'User not found', status: 404 }, res)
    Success(res, { data: user, model: 'user' })
  } catch (error) {
    Error(error, res)
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    debug('deleteUser')
    await dbUser.delete(id)
    Success(res)
  } catch (error) {
    Error(error, res)
  }
}

const getUserTypeById = async (req, res) => {
  const { id } = req.params

  try {
    debug('getUserType')
    const userType = await dbUser.findUserTypeById(id)
    if (!userType) return Error({ message: 'User not found', status: 404 }, res)
    Success(res, { data: userType, model: 'user' })
  } catch (error) {
    Error(error, res)
  }
}

const getUserTypeUser = async (req, res) => {
  try {
    const users = await dbUser.findAllByTypeUser()
    if (!users) return Error({ message: 'Users not found', status: 404 }, res)
    Success(res, { data: users, model: 'users' })
  } catch (error) {
    Error(error, res)
  }
}

export default {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserTypeById,
  getUserTypeUser
}
