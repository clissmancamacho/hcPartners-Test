'use strict'

import { dbRol, dbPerson, dbUser } from '../db-api'

const adminRole = {
  '_id': '5b9f37344ba1930a0a105eb4',
  'permissions': [
    'admin',
    'user',
    'user:create',
    'user:read',
    'user:all',
    'user:update',
    'user:delete',
    'user-persona:read',
    'person',
    'person:create',
    'person:read',
    'person:all',
    'person:update',
    'person:delete',
    'pokemon',
    'pokemon:create',
    'pokemon:read',
    'pokemon:all'
  ],
  'rol': 'admin',
  'status': 1,
  '__v': 0
}

const userRole = {
  '_id': '5d8d932f7ce3c41c4971476e',
  'permissions': [
    'user',
    'user:create',
    'user:read',
    'user:all',
    'user:update',
    'user:delete',
    'user-persona:read',
    'person',
    'person:create',
    'person:read',
    'person:all',
    'pokemon',
    'pokemon:create',
    'pokemon:read',
    'pokemon:all'
  ],
  'rol': 'user',
  'status': 1,
  '__v': 0
}

const defaultPersonAdmin = {
  '_id': '5d8d93672bb32d4593187777',
  'firstName': 'Admin',
  'lastName': 'Admin',
  'status': 1,
  '__v': 0
}

const defaultUserAdmin = {
  '_id': '5d8d93672bb32d4593187778',
  'rol': '5b9f37344ba1930a0a105eb4',
  'email': 'admin@example.com',
  'password': 'password',
  'person': '5d8d93672bb32d4593187777',
  'status': 1,
  '__v': 0
}

const createDefaultAdminUser = async () => {
  try {
    await dbPerson.create(defaultPersonAdmin)
    await dbUser.create(defaultUserAdmin)
  } catch (error) {
    console.log(error)
  }
}

const createDefaultRoles = async () => {
  try {
    await dbRol.create(adminRole)
    await dbRol.create(userRole)
  } catch (error) {
    console.log(error)
  }
}

const createData = async () => {
  const roles = await dbRol.findAll()

  if (roles.length > 0) return false

  createDefaultRoles()
  createDefaultAdminUser()
}

export default createData
