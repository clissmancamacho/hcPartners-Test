'use strict'

/* Global Imports */
import Debug from 'debug'
import { TypeUser } from '../models'

/* Config vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:db-api:typeUser')

export default {

  findAll: () => {
    debug('findAll TypeUser')
    const types = TypeUser.findAll({
      attributes: ['id', 'name']
    })
    return types
  },

  findById: async (id) => {
    debug('findByID TypeUser')
    const type = await TypeUser.findOne({
      where: {
        id
      },
      attributes: ['id', 'name']
    })
    return type
  },

  create: (objectTypeUser) => {
    debug('Create TypeUser')
    const type = new TypeUser(objectTypeUser)
    return type.save()
  },

  update: async (id, typeUser) => {
    debug('Update TypeUser')
    let typeToUpdate = await TypeUser.findOne({
      where: {
        id
      },
      attributes: ['id', 'name']
    })
    if (typeToUpdate) {
      return typeToUpdate.update(typeUser)
    }
    return false
  },

  delete: async (id) => {
    debug('Delete TypeUser')
    const typeToDelete = await TypeUser.findOne({
      where: {
        id
      },
      attributes: ['id', 'name']
    })
    if (typeToDelete) {
      return typeToDelete.destroy()
    }
    return false
  }
}
