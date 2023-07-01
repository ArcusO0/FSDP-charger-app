module.exports = (sequelize, DataTypes) => {
    const Charger = sequelize.define("chargers", {
        chargerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        noOfBookings: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookingRate: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false
        }
    });
    return Charger;
}