const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // autentica o token JWT 
        jwt({ secret, algorithms: ['HS256'] }),

        // trabalha o registro de usuário junto à requisção
        async (req, res, next) => {
            // pega o id o usuário
            const user = await db.User.findByPk(req.user.sub);

            // checa se usuário existe
            if (!user)
                return res.status(401).json({ message: 'Não Autorizado' });

            // sucesso na autorização
            req.user = user.get();
            next();
        }
    ];
}