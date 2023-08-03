module.exports = (sequelize, DataTypes) => {
    const finalRequests = sequelize.define("finalRequests", {
        reqId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rate: { // How much the EV Charger will charge the customers per hour
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addOrDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

    });
    return finalRequests;
}