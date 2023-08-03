module.exports = (sequelize, DataTypes) => {
    const finalEVC = sequelize.define("finalEVC", {
        vendorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chargerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        bookingRate: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        noOfBookings: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return finalEVC;
}