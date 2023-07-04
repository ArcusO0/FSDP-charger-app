module.exports = (sequelize, DataTypes) => {
    const charger = sequelize.define("chargers", {

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
    charger.associate = (models) => {
        charger.hasMany(models.bookings, {
            foreignKey: "chargerId",
        });
    };
    return charger;
}