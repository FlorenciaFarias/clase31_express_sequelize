module.exports = (sequelize, DataTypes) => {
    let alias = "user";
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.TEXT
        },
        avatar: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.image, {
            foreignKey: 'avatar'
        })
    }

    return User;
}