const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) =>{
    if(req.method === 'OPTIONS'){
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message: 'Authentication Error | Token Issues'
            });
        }
        const decodedToken = jwt.verify(token, config.get('secretKey'));
        req.user = decodedToken;
        next()
    } catch (e) {
        return res.status(401).json({
            message: 'Authentication error. | Some troubles'
        });
    }
}