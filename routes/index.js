const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const v = '/api/v1'

const U = require('../controllers/user')
const G = require('../controllers/good')
const C = require('../controllers/cart')

// RESTful API 规范=>是否需要鉴权
router
    .get(`${v}/getUserList`, U.getUserList)
    .get(`${v}/getGoodList`, G.getGoodList)
    .get(`${v}/getAllCates`, G.getAllCates)
    .get(`${v}/getGoodInfo`, G.getGoodInfo)
    .post(`${v}/user/register`, U.register)
    .post(`${v}/user/login`, U.login)

    .post(`${v}/cart/add`, checkToken, C.addToCart)
    .get(`${v}/cart/list`, checkToken, C.getCartList)
    .get(`${v}/cart/del`, checkToken, C.delCartItem)
    .get(`${v}/cart/update`, checkToken, C.updateCartCount)
    .post(`${v}/cart/submit`, checkToken, C.submitCart)

module.exports = router
