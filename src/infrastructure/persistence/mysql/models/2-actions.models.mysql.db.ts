import * as Sequelize from 'sequelize';
import { MysqlDatabase } from "../mysql.database";

export default MysqlDatabase.getInstance().createModel('actions', {
    tinytitle: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        field: 'tinytitle',
        autoIncrement: false,
        unique: true,
    },
    action: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DataTypes.DATE,
    updatedAt: Sequelize.DataTypes.DATE,
});