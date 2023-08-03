module.exports = (sequelize, DataTypes) => {
    const finalBooking = sequelize.define("finalBooking", {
        vendorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        evcId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingPrice: {
            type: DataTypes.DECIMAL(4, 2)
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        arrivalTime: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return finalBooking;
};