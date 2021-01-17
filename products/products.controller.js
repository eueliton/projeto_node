const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const productService = require('./product.service');

// rotas
router.post('/add',authorize(), addSchema, add);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function addSchema(req, res, next) {
    const schema = Joi.object({
        descricao: Joi.string().required(),
        valor: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function add(req, res, next) {
    productService.create(req.body)
        .then(() => res.json({ message: 'Produto cadastrado com sucesso!' }))
        .catch(next);
}

function getAll(req, res, next) {

    
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        descricao: Joi.string().empty(''),
        valor: Joi.number().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'Produto apagado com sucesso' }))
        .catch(next);
}