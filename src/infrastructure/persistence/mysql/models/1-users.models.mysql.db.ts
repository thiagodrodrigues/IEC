import * as Sequelize from 'sequelize';
import { MysqlDatabase } from "../mysql.database";

export default MysqlDatabase.getInstance().createModel('users', {
    idUsers: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idUsers',
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }, 
    photo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
});