const jwt = require('jsonwebtoken')

function generateToken(user){
    if(!user) return null;

    return jwt.sign(user, 'mysecret',{
        expiresIn: '1h'
    })
}

function verifyToken(username, token){

    return jwt.verify(token, 'mysecret',(err, res) => {
        if(err){
            return {
                verified: false,
                message: 'Invalid token.'
            }
        }
        if(res.username !== username){
            return {
                verified: false,
                message: 'Invalid user.'
            }
        }
        return {
            verified: true,
            message: 'Verified.'
        }
    })
}

module.exports.generateToken = generateToken
module.exports.verifyToken = verifyToken