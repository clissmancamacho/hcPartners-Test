'use strict'

/* Global imports */
import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import dotenv from 'dotenv'

/* Config Vars */
dotenv.config()

// Schema del modelo Usuario con sequelize

const TypeUser = sequelize.define('type_user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING }
})

export default TypeUser
