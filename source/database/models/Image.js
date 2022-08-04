module.exports = (sequelize, DataTypes) => {
    let alias = 'image';
    let cols = {
        name:{
            type: DataTypes.STRING
        }
    } 
    let config = {
        timestamps: false,
        deleteAt: false
    };

    const Images = sequelize.define(alias, cols, config);
    
    Images.associate = function(models){
        Images.hasMany(models.user, {
            as: 'users',
            foreignKey: 'avatar'
        })
    }
    return Images

}