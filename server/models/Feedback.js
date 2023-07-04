module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define("Feedback", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Tutorial.associate = (models) => {
        Tutorial.belongsTo(models.User, {
            foreignKey: "userId",
            as: 'user'
        });
    };
    return Tutorial;
}