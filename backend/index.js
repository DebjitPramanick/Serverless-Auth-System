const registerService = require('./services/register.js')
const loginService = require('./services/login.js')
const verifyService = require('./services/verify.js')
const utils = require('./utils/utils.js')

const HEALTH_PATH = '/health';
const REGISTER_PATH = '/register';
const LOGIN_PATH = '/login';
const VERIFY_PATH = '/verify';

exports.handler = async (event) => {
    let res;
    
    switch(true){
        case event.httpMethod === 'GET' && event.path === HEALTH_PATH:
            res = utils.buildResponse(200);
            break;
        case event.httpMethod === 'POST' && event.path === REGISTER_PATH:
            const registerBody = JSON.parse(event.body)
            res = registerService.register(registerBody)
            break;
        case event.httpMethod === 'POST' && event.path === LOGIN_PATH:
            const loginBody = JSON.parse(event.body)
            res = loginService.login(loginBody)
            break;
        case event.httpMethod === 'POST' && event.path === VERIFY_PATH:
            const verifyBody = JSON.parse(event.body)
            res = verifyService.verify(verifyBody)
            break;
        default:
            res = utils.buildResponse(404, '404 Not Found.');
            break;
    }
    return res;
};

