const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    // validação
    if (await db.Product.findOne({ where: { descricao: params.descricao } })) {
        throw 'Produto "' + params.descricao + '" já cadastrado';
    }
    // salvando produto
    await db.Product.create(params);
}

async function update(id, params) {
    const product = await getProduct(id);

    // validação
    const descricaoChanged = params.descricao && product.descricao !== params.descricao;
    if (descricaoChanged && await db.Product.findOne({ where: { descricao: params.descricao } })) {
        throw '`Produto` "' + params.descricao + '" já existe';
    }

    // copia parâmetros e salva
    Object.assign(product, params);
    await product.save();

    return omitHash(product.get());
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// helpers

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Produto não encontrado';
    return product;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}