const {user, image} = require('../../database/models');
const {Op} = require('sequelize');


const userApi = {
    all: async(req,res) => {
        try {
            let users = await user.findAll({
                include: {
                    all: true
                }
            });
            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    oneUser: async (req, res) =>{
        try {
            let userDB = await user.findByPk(
                req.params.id, {
                    include: {
                        all: true
                    }
                }
            )
            if(userDB){

                return res.status(200).json(userDB);
            }else{
                return res.status(404).json('No se encontró este usuario.');
            }
        } catch (error) {
            return res.status(500).json(error);
        }

    },
    process: async (req, res) =>{

        try {
            
            let newUser = await user.create(req.body);
            if(newUser){

                return res.status(200).json(newUser);
            }else{
                return res.status(404).json('No se creó el usuario');
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    userDestroy: async (req, res) =>{     
   
    try {
        let userDelete = await user.destroy({
            where: {
                id: req.params.id
    }})
        if(userDelete){

            return res.status(200).json(userDelete);
        }else{
            return res.status(500).json(userDelete);
        }
    } catch (error) {
        return res.status(500).json(error);
    } 
}
};

module.exports = userApi;