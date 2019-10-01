'use strict'

/* Global Imports */
import { dbTypeUser } from '../db-api/'
import { Success, Error } from '../util'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:controllers:typeUser')

/* * * * * * * * * *  Controlller Functions * * * * * * * * * * * */

const getTypeUsers = async (req, res) => {
  try {
    debug('getTypeUsers')
    const typeUsers = await dbTypeUser.findAll()
    if (!typeUsers) return Error({ message: 'TypeUser not found', status: 404 }, res)
    Success(res, { data: typeUsers, model: 'typeUsers' })
  } catch (error) {
    Error(error, res)
  }
}

const getTypeUser = async (req, res) => {
  try {
    const { id } = req.params
    debug('getTypeUser')
    const typeUser = await dbTypeUser.findById(id)
    if (!typeUser) return Error({ message: 'TypeUser not found', status: 404 }, res)
    Success(res, { data: typeUser, model: 'typeUser' })
  } catch (error) {
    Error(error, res)
  }
}

const saveTypeUser = async (req, res) => {
  try {
    debug('saveTypeUser')
    const objectTypeUser = req.body
    const typeUser = await dbTypeUser.create(objectTypeUser)
    Success(res, { data: typeUser, model: 'typeUser' }, 201)
  } catch (error) {
    Error(error, res)
  }
}

const updateTypeUser = async (req, res) => {
  try {
    const { id } = req.params
    const objectTypeUser = req.body
    debug('updateTypeUser')
    const typeUser = await dbTypeUser.update(id, objectTypeUser)
    if (!typeUser) return Error({ message: 'TypeUser not found', status: 404 }, res)
    Success(res, { data: typeUser, model: 'typeUser' })
  } catch (error) {
    Error(error, res)
  }
}

const deleteTypeUser = async (req, res) => {
  const { id } = req.params

  try {
    debug('deleteTypeUser')
    await dbTypeUser.delete(id)
    Success(res)
  } catch (error) {
    Error(error, res)
  }
}

export default {
  saveTypeUser,
  getTypeUsers,
  getTypeUser,
  updateTypeUser,
  deleteTypeUser
}
