module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: { type: dataTypes.STRING },
        contraseña: { type: dataTypes.STRING },
        email: { type: dataTypes.STRING },
        fechaDeNacimiento: { type: dataTypes.STRING },
        fotoDePerfil: { type: dataTypes.STRING }
    }

    const configs = {
        tableName: 'user',
        timestamps: false
    }

    const user = sequelize.define('user', cols, configs);

    user.associate = function(models) {
        user.hasMany(models.Comentario, {
            as: 'user',
            foreignKey: 'usuario_id'
        });
        user.hasMany(models.Joya, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });
       
       
        
    }

    return user;
}