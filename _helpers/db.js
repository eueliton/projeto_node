const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // cria o banco de dados se não existe
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // conecta ao banco
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: 'mysql' });

    // inicializa as models e cria no banco
    db.User = require('../users/user.model')(sequelize);
    db.Product = require('../products/product.model')(sequelize);

    // sincroniza as models no banco
     //await sequelize.sync({ force: true, logging: console.log });
     await sequelize.sync();
}