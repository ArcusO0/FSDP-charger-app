module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        oldvendorID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oldbookingID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oldcustomerID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oldevcID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oldbookingPrice: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: false
        },
        oldduration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        oldarrivaltime: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Booking;
}
