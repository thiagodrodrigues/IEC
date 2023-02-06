import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('projects', {
            tinysubtitle: {
                type: Sequelize.DataTypes.STRING,
                primaryKey: true,
                autoIncrement: false,
                field: 'tinysubtitle',
                unique: true
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
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('projects');
    }
}