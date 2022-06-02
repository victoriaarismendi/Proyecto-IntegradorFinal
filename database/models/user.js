module.exports = function (sequelize, dataTypes) {
    const cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        usuario: { type: dataTypes.STRING },
        contrasenia: { type: dataTypes.STRING },
        email: { type: dataTypes.STRING },
        fechaDeNacimiento: { type: dataTypes.STRING },
        documento: { type: dataTypes.STRING },
        fotoDePerfil: { type: dataTypes.STRING }
    }

    const configs = {
        tableName: 'users',
        timestamps: false
    }

    const Joya = sequelize.define('User', cols, configs);

    return Joya;
}