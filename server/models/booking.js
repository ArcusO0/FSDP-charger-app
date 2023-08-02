module.exports= (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
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
            allowNull: true
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        evcId:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Booking;
};
