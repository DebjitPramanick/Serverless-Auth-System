const AWS = require('aws-sdk')
const utils = require('../utils/utils.js')
const bcrypt = require('bcryptjs')
const auth = require('../utils/auth')

AWS.config.update({
    region: 'us-east-2'
})

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const table = 'system-users'


async function login(user){
    const username = user.username;
    const password = user.password;

    if(!user || !password){
        return utils.buildResponse(401, {
            message: "Username and password are required."
        })
    }

    const dynamoUser = await getUser(username);
    if(!dynamoUser || !dynamoUser.username){
        return utils.buildResponse(403,{
            message: "User does not exist."
        })
    }

    if(!bcrypt.compareSync(password, dynamoUser.password)){
        return utils.buildResponse(403,{
            message: "Password is incorrect."
        })
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name
    }

    const token = auth.generateToken(userInfo)
    const res = {
        user: userInfo,
        token: token
    }

    return utils.buildResponse(200, res)
}

async function getUser(username){
    const params = {
        TableName: table,
        Key: {
            username: username
        }
    }
    return await dynamoDB.get(params)
    .promise()
    .then(res => {
        return res.Item
    }, err => {
        console.log('This is an error: ', err)
    })
}


module.exports.login = login