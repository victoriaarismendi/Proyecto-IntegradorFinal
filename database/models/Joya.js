const sequelize = require ('sequelize');

module.exports = function (sequelize, dataTypes) {
    
    const cols = {
        id: { autoincrement:true,
            primaryKey: true,
            type: dataTypes.INTEGER    
        },
        producto:{type: dataTypes.STRING},
        piedras:{type: dataTypes.STRING},
        material:{type: dataTypes.STRING},
        imagen:{type: dataTypes.STRING},
        fechaDeCarga:{type: dataTypes.STRING},
    }

    const configs = {
        tableName: 'joyas',
        timestamps: false
    }


    const Joya = sequelize.define('Joya', cols, configs );


    return Joya;
}