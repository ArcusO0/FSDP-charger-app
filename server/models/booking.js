module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        license: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        arrival: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Booking;
}
