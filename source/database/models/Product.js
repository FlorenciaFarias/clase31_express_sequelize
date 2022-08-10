module.exports = (sequelize, DataTypes) => {
    let alias = 'product';
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        },
    };
    let config = {
        timestamps:false,
        deletedAt:false
    };
    const product = sequelize.define(alias,cols,config)

    product.associate = ({image}) => {
        product.belongsToMany(image,{
            through:'imagesProducts',
            foreignKey:'product'
        })
    }
    return product
}