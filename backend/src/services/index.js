'use strict'

/* Global Imports */
import jwt from 'jwt-simple'
import moment from 'moment'
import dotenv from 'dotenv'
import { handleError } from '../util'

/* Config vars */
dotenv.config()

/* Methods of services */

const createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(process.env.TOKEN_HOURS_EXPIRE, 'hours').unix()
  }
  console.log(payload)
  return jwt.encode(payload, process.env.SECRET_TOKEN, 'HS256', { typ: 'JWT' })
}

const decodeToken = (token) => {
  const decoded = new Promise(async (resolve, reject) => {
    try {
      const payload = await jwt.decode(token, process.env.SECRET_TOKEN)

      if (payload.exp < moment().unix()) {
        handleError(new Error('The token has expired'))
        reject({ status: 401, message: 'The token has expired', error: 'Token Expired' })
      }
      resolve(payload)
    } catch (err) {
      handleError(err)
      reject(new Error(err))
    }
  })
  return decoded
}

export {
  createToken,
  decodeToken
}
