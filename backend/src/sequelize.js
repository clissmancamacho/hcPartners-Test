import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

/* Config Vars */
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})

export default sequelize
