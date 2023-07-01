module.exports = (sequelize, DataTypes) => {
    const EVC = sequelize.define("EVC Info", {
        vendorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chargerId: {
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
        rate: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(2,1),
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return EVC;
}