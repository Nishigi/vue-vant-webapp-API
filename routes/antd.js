const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const v = '/api/v1'

const user = require('../controllers/user')

router
    .get(`${v}/antd/user`, checkToken, user.getUserList)
    .post(`${v}/antd/login`, user.login)
    .get(`${v}/antd/getUserInfo`,checkToken, user.getUserInfo)
    .post(`${v}/antd/addUser`,checkToken, user.addUser)
    .get(`${v}/antd/changeStatus`,checkToken, user.changeUserStatus)


module.exports = router