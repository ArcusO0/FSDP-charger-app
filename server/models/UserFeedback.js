module.exports = (sequelize, DataTypes) => {
    const UserFeedback = sequelize.define("UserFeedback", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return UserFeedback;
}
