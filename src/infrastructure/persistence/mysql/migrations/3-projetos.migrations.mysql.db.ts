import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('projects', {
            idProject: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tinytitle: {
                type: Sequelize.DataTypes.STRING,
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
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('projects');
    }
}