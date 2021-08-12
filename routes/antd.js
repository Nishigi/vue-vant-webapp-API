const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const v = '/api/v1'

const user = require('../controllers/user')

router
    .get(`${v}/antd/user`, checkToken, user.getUserList)
    .post(`${v}/antd/login`, user.login)
    .get(`${v}/antd/getUserInfo`,checkToken, user.getUserInfo)


module.exports = router