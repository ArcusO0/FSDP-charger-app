module.exports = (sequelize, DataTypes) => {
    const OldUserBooking = sequelize.define("OldBooking", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        license: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        hours: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrival: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return OldUserBooking;
}
