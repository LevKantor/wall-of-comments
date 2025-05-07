import { DataTypes } from 'sequelize'
import sequelize from '../sequelize.js'

const comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        datetime: {
            type: DataTypes.DATE,
            unique: true,
        },
    },
    {
        tableName: 'comment', // Указываем имя таблицы, если оно отличается от модели
        timestamps: false, // Отключаем автоматические поля createdAt/updatedAt
    }
)

export default comment
