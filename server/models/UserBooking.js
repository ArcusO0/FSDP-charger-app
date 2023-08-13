module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
        bookingID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        license: {
            type: DataTypes.TEXT,
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
    return Booking;
}
