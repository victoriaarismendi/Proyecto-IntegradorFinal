const sequelize = require ('sequelize');

module.exports = function (sequelize, DataTypes) {
    
    const cols = {
        id: { autoincrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER    
        },
    name:{type: DataTypes.STRING},
    name:{type: DataTypes.STRING},
    name:{type: DataTypes.STRING},
    }

    const configs = {
        tableName: 'Joya',
        timestampes: false
    }


    const Joya = sequelize.define('Joya', );


    return Joya;
}