const sequelize = require ('sequelize');

module.exports = function (sequelize, dataTypes) {
    
    const cols = {
        id: { autoIncrement:true,
            primaryKey: true,
            type: dataTypes.INTEGER    
        },
        producto:{type: dataTypes.STRING},
        piedras:{type: dataTypes.STRING},
        material:{type: dataTypes.STRING},
        imagen:{type: dataTypes.STRING},
        fechaDeCarga:{type: dataTypes.DATE},
    }

    const configs = {
        tableName: 'joyas',
        timestamps: false
    }


    const Joya = sequelize.define('Joya', cols, configs );
    Joya.associate = function(models) {
        Joya.belongsTo(models.user, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        })
        Joya.hasMany(models.Comentarios, {
            as: 'comentario',
            foreignKey: 'producto_id'
        })
    }
    return Joya;
}