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
        usuario_id:{type: dataTypes.STRING},
        updatedAt:{type: dataTypes.DATE},
        createdAt: { type: dataTypes.DATE }


    }

    const configs = {
        tableName: 'joyas',
        timestamps: true
    }


    const Joya = sequelize.define('Joya', cols, configs );
    Joya.associate = function(models) {
       Joya.belongsTo(models.User, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });
        Joya.hasMany(models.Comentario, {
            as: 'comentarios',
            foreignKey: 'producto_id'
        })
    }
    return Joya;
}