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
        updatedAt: {type: dataTypes.DATE}
    }

    const configs = {
        tableName: 'comentarios',
        timestamps: false
    }


    const Comentario = sequelize.define('Comentario', cols, configs );

    Comentario.associate = function(models) {
        Comentario.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'usuario_id'
        });
        Comentario.belongsTo(models.Joya, {
            as: 'joya',
            foreignKey: 'producto_id'
        })
    }  


    return Comentario;
}