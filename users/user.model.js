const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclui hash por padrão
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // inclui hash com esse escopo
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}