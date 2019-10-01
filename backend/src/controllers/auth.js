'use strict'

/* Global Imports */
import { dbUser } from '../db-api/'
import { Success, Error } from '../util'
import { createToken } from '../services'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-hcPartnersTest-backend:controllers:auth')

const register = async (req, res) => {
  try {
    debug('Register')
    const params = req.body
    const findUser = await dbUser.findByEmail(params.email)

    if (findUser) {
      return handleRegisterFailed(res, 'This email already exist')
    } else {
      let objectUser = params
      objectUser.typeUserId = process.env.DEFAULT_ROL
      const userSaved = await dbUser.create(objectUser)
      const user = await dbUser.findUserTypeById(userSaved.id)
      const token = await createToken(user)
      const response = generateResponse(user, token)

      Success(res, { data: response, model: 'user' }, 201)
    }
  } catch (error) {
    Error(error, res)
  }
}

const login = async (req, res) => {
  try {
    debug('Login')
    const { identity, password } = req.body
    const user = await dbUser.findUserTypeByEmail(identity)
    if (!user) {
      // validation if the email of user doesn't exist
      return handleLoginFailed(res)
    } else {
      await user.comparePassword(password, user, function (error, match) {
        if (error) Error(error, res)
        else if (match) {
          const token = createToken(user)
          const response = generateResponse(user, token)
          Success(res, { data: response, model: 'user' }, 200)
        } else {
          return handleLoginFailed(res, 'The username and password is invalid.')
        }
      })
    }
  } catch (error) {
    Error(error, res)
  }
}

/* Function to handle Errors in Login */
function handleLoginFailed (res, message) {
  console.error(message || 'The user with email doesn\'t exist')
  res.status(401).send({
    message: message || 'The user with email doesn\'t exist',
    error: 'Login failed'
  })
}

function handleRegisterFailed (res, message) {
  console.error(message || 'This email already exist')
  res.status(409).send({
    message: message || 'This email already exist',
    error: 'Register Failed'
  })
}

/* Function to generate the response object
* params:
* 1) User Object
* 2) Person Object
* 3) JWT token
*/
function generateResponse (user, token) {
  const response = {
    id: user.id,
    name: user.name,
    email: user.email,
    type_user: user.type_user,
    token
  }

  return response
}

/* Function to generate the objectUser
* params:
* 1) Object user
* 2) personId
*/

export default {
  register,
  login
}
