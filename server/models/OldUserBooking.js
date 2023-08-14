module.exports = (sequelize, DataTypes) => {
    const OldUserBooking = sequelize.define("OldUserBooking", {
        vendorID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        evcID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingPrice: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        arrivaltime: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return OldUserBooking;
}