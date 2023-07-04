module.exports = (sequelize, DataTypes) => {
    const bookings = sequelize.define("bookings", {
        bookingID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customerId: {
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

    bookings.associate = (models) => {
        bookings.belongsTo(models.chargers, {
            foreignKey: "chargerId",
            as: 'charger'
        });
    };

    return bookings;
};