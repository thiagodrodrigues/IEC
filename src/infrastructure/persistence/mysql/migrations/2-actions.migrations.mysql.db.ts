import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('actions', {
            tinytitle: {
                type: Sequelize.DataTypes.STRING,
                primaryKey: true,
                field: 'tinytitle',
                autoIncrement: false,
                unique: true,
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            action: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            coverPhoto: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('actions');
    }
}