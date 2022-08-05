module.exports = (sequelize, DataTypes) => {
    let alias = 'image';
    let cols = {
        path:{
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
        }),
        Images.belongsToMany(models.product,{
            through:'imagesProducts',
            foreignKey:'image',
            otherKey:'product'
        })
    }
    return Images

}