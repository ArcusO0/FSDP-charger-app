module.exports= (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking Info", {
        vendorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookingPrice: {
            type: DataTypes.DECIMAL(4,2)
        },
        bookingDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Booking;
};
