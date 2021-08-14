const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const v = '/api/v1'

const user = require('../controllers/user')
const article = require('../controllers/article')
const upload = require('../controllers/uploadImg')

router
    .get(`${v}/antd/user`, checkToken, user.getUserList)
    .post(`${v}/antd/login`, user.login)
    .get(`${v}/antd/getUserInfo`,checkToken, user.getUserInfo)
    .post(`${v}/antd/addUser`,checkToken, user.addUser)
    .get(`${v}/antd/changeStatus`,checkToken, user.changeUserStatus)
	
    .get(`${v}/antd/getCates`,checkToken, article.getCates)
    .post(`${v}/antd/articleAddOrEdit`,checkToken, article.articleAddOrEdit)	
    .get(`${v}/antd/articleList`,checkToken, article.articleList)
    .get(`${v}/antd/articleInfo`,checkToken, article.articleInfo)
    .get(`${v}/antd/upload`,checkToken, upload.uploadImg)


module.exports = router