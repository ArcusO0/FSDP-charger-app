module.exports = (sequelize, DataTypes) => {
    const requests = sequelize.define("requests", {
        reqId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addOrDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return requests;
}