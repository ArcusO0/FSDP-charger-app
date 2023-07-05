module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        License: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Hours: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Arrival: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Booking;
}
