import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('postgres', 'postgres', 'web-developer25', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
})

export default sequelize
