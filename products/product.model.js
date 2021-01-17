const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        descricao: { type: DataTypes.STRING, allowNull: false },
        valor: { type: DataTypes.DOUBLE, allowNull: false },
      
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

    return sequelize.define('Product', attributes, options);
}