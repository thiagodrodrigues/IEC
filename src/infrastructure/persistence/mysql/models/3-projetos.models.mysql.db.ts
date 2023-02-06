import * as Sequelize from 'sequelize';
import { MysqlDatabase } from "../mysql.database";

export default MysqlDatabase.getInstance().createModelReference('projects', {
    idProject: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tinytitle: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        field: 'tinytitle',
        autoIncrement: false,
        unique: true,
        references: {
            model: {
                tableName: 'actions'
            },
            key: 'tinytitle',
        }
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
    },
    text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
    },
    photo: Sequelize.DataTypes.STRING,
});