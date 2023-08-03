module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define("Feedback", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Feedback;
}
