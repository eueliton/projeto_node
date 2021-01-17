module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // erros customizados
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // erros na autenticação jwt
            return res.status(401).json({ message: 'Não Autorizado' });
        default:
            return res.status(500).json({ message: err.message });
    }
}