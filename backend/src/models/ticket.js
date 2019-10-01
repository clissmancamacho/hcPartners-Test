'use strict'

/* Global imports */
import { DataTypes } from 'sequelize'
import sequelize from '../sequelize'
import dotenv from 'dotenv'
import User from './user'
/* Config Vars */
dotenv.config()

// Schema del modelo Usuario con sequelize

const Ticket = sequelize.define('ticket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  requested_ticket: { type: DataTypes.BOOLEAN, defaultValue: false }
})

Ticket.belongsTo(User)

export default Ticket
