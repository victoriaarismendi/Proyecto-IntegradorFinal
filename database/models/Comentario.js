const sequelize = require ('sequelize');

module.exports = function (sequelize, dataTypes) {
    
    const cols = {
        id: { autoincrement:true,
            primaryKey: true,
            type: dataTypes.INTEGER    
        },
        usuario_id:{type: dataTypes.STRING},
        producto_id:{type: dataTypes.STRING},
        comentario:{type: dataTypes.STRING},
        fotoDePerfil:{type: dataTypes.STRING},
        fechaDeCarga:{type: dataTypes.STRING},
    }

    const configs = {
        tableName: 'comentarios',
        timestamps: false
    }


    const Comentarios = sequelize.define('Comentarios', cols, configs );

    Comentarios.associate = function(models) {
        Comentarios.belongsTo(models.User, {
            as: 'autor',
            foreignKey: 'usuario_id'
        });
        Comentarios.belongsTo(models.Joya, {
            as: 'joya',
            foreignKey: 'producto_id'
        })
    }  


    return Comentarios;
}