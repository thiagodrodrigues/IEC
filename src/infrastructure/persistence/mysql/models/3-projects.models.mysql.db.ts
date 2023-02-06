import * as Sequelize from 'sequelize';
import { MysqlDatabase } from "../mysql.database";

export default MysqlDatabase.getInstance().createModelReference('projects', {
    tinysubtitle: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        field: 'tinysubtitle',
        unique: true
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
    subtitle: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
    },
    text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
    },
    photoContent: Sequelize.DataTypes.STRING,
});