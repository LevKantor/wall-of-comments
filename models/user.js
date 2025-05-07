import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const user = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'person', // Указываем имя таблицы, если оно отличается от модели
        timestamps: false, // Отключаем автоматические поля createdAt/updatedAt
    }
)

export default user
