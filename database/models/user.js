module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: { type: dataTypes.STRING },
        contrasena: { type: dataTypes.STRING },
        email: { type: dataTypes.STRING },
        fechaDeNacimiento: { type: dataTypes.STRING },
        fotoDePerfil: { type: dataTypes.STRING },
        updatedAt: { type: dataTypes.DATE},
        createdAt: { type: dataTypes.DATE }

    }

    const configs = {
        tableName: 'user',
        timestamps: false
    }

    const User = sequelize.define('User', cols, configs);

    User.associate = function(models) {
        User.hasMany(models.Joya, {
             as: 'joyas',
             foreignKey: 'usuario_id'
         });
         User.hasMany(models.Comentario, {
             as: 'comentarios',
             foreignKey: 'usuario_id'
         })
     }

    return User;
}