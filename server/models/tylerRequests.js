module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        type: { // "Add" or "Delete"
            type: DataTypes.STRING,
            allowNull: false
        },
        name: { // EV Charger Name
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rate: { // How much the EV Charger will charge the customers per hour
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true
        },
        status: { // EVC Request Status
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Request;
}