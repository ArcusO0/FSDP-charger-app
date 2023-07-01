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
        status: { // EVC Request Status
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Request;
}
