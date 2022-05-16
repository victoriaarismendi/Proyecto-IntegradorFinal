const sequelize = require ('sequelize');

module.exports = function (sequelize, DataTypes) {
    
    const cols = {
        id: { autoincrement:true,
            primaryKey: true,
            type: dataTypes.INTEGER    
        },
        producto:{type: dataTypes.STRING},
        piedras:{type: dataTypes.STRING},
        material:{type: dataTypes.STRING},
        imagen:{type: dataTypes.STRING},
        fechaDeCarga:{type: dataTypes.INTEGER},
    }

    const configs = {
        tableName: 'Joya',
        timestampes: false
    }


    const Joya = sequelize.define('Joya', cols, configs );


    return Joya;
}