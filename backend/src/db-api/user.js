'use strict'

/* Global Imports */
import Debug from 'debug'
import { User, TypeUser } from '../models'
import { Sequelize } from 'sequelize'

/* Config vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:db-api:user')

export default {

  findAll: () => {
    debug('findAll User')
    const users = User.findAll({
      attributes: ['id', 'name', 'email', 'typeUserId']
    })
    return users
  },

  findAllByTypeUser: () => {
    debug('findAll ByTypeUser')
    const users = User.findAll({
      where: {
        typeUserId: process.env.DEFAULT_ROL
      },
      attributes: ['id', 'name', 'email', 'typeUserId']
    })
    return users
  },

  findById: (id) => {
    debug('findByID User')
    const user = User.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'email', 'typeUserId']
    })
    return user
  },

  findByEmail: (email) => {
    debug('findByEmail User')
    const user = User.findOne({
      where: {
        email
      },
      attributes: ['id', 'name', 'email', 'typeUserId']
    })
    return user
  },

  create: (objectUser) => {
    debug('Create User')
    const user = new User(objectUser)
    return user.save()
  },

  update: async (id, user) => {
    debug('Update User')
    let userToUpdate = await User.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'email', 'typeUserId']
    })
    if (userToUpdate) {
      return userToUpdate.update(user)
    }
    return false
  },

  delete: async (id) => {
    debug('Delete User')
    const userToDelete = await User.findByPk(id)
    if (userToDelete) {
      return userToDelete.destroy()
    }
    return false
  },

  findUserTypeByEmail: (email) => {
    debug('findUserTypeByEmail')
    const user = User.findOne({
      where: {
        email
      },
      include: [
        {
          model: TypeUser,
          where: { id: Sequelize.col('user.typeUserId') },
          attributes: ['id', 'name']
        }
      ]
    })
    return user
  },

  findUserTypeById: (id) => {
    debug('findUserTypeById')
    const user = User.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: TypeUser,
          where: { id: Sequelize.col('user.typeUserId') },
          attributes: ['id', 'name']
        }
      ]
    })
    return user
  }
}
