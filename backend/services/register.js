const AWS = require('aws-sdk')
const utils = require('../utils/utils.js')
const bcrypt = require('bcryptjs')

AWS.config.update({
    region: 'us-east-2'
})

const dynamoDB = new AWS.DynamoDB.DocumentClient()
const table = 'system-users'

async function register(info){
    const name = info.name
    const username = info.username
    const email = info.email
    const password = info.password

    if(!username || !name || !email || !password){
        return utils.buildResponse(401, {
            message: "All fields are required.",
            body: info
        })
    }

    const dynamoUser = await getUser(username)
    if(dynamoUser && dynamoUser.username){
        return utils.buildResponse(401, {
            message: "Username already exists!"
        })
    }

    const encpPass = bcrypt.hashSync(password.trim(), 10)
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encpPass
    }

    const saveUserResponse = await saveUser(user)
    if(!saveUserResponse){
        return utils.buildResponse(503, {
            message: "Server error, please try again later."
        })
    }

    return utils.buildResponse(200, {
        username: username
    })
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

async function saveUser(user){
    const params = {
        TableName: table,
        Item: user
    }
    return await dynamoDB.put(params)
    .promise()
    .then(res => {
        return true
    }, err => {
        console.log('This is an error: ', err)
    })
}

module.exports.register = register