module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    const requests = sequelize.define("requests", {
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
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addOrDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return requests;
}
=======
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
            type: DataTypes.DECIMAL(4,2),
            allowNull: true
        },
        status: { // EVC Request Status
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Request;
}
>>>>>>> origin/Tyler
