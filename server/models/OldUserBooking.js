module.exports = (sequelize, DataTypes) => {
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
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return OldUserBooking;
}