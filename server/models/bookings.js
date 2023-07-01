module.exports = (sequelize, DataTypes) => {
    const bookings = sequelize.define("bookings", {
        bookingID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        chargerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        bookingDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        bookingPrice: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false
        }
    });
    return bookings;
}