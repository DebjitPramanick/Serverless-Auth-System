const AWS = require('aws-sdk')
const utils = require('../utils/utils.js')
const bcrypt = require('bcryptjs')
const auth = require('../utils/auth')

AWS.config.update({
    region: 'us-east-2'
})

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const table = 'system-users'

function verify(body){
    if(!body.user || !body.user.username || !body.token){
        return utils.buildResponse(401, {
            verified: false,
            message: 'Incorrect request body.'
        })
    }

    const user = body.user
    const token = body.token
    const verification = auth.verifyToken(user.username, token);
    if(!verification.verified){
        return utils.buildResponse(401, verification)
    }
    return utils.buildResponse(200, {
        verified: true,
        message: user,
        user: user,
        token: token
    })
}

module.exports.verify = verify