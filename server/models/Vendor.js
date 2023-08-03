module.exports = (sequelize, DataTypes) => {
    const Vendor = sequelize.define("Vendor", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    return Vendor;
}
