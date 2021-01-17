module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // inclui todos erros
        allowUnknown: true, // ignora desconhecidos
        stripUnknown: true // remove desconhecidos
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Erros de validação: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}