module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
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
=======
    const OldUserBooking = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
>>>>>>> a17fec0e2840c5f10c33dbaf8cfc81f5a1630421
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return OldUserBooking;
}