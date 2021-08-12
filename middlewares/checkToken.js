// const {verifyToken} = require('../utils/jwt')
const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
	const token = ctx.headers.authorization
	console.log('---GET_TOKEN--', token)
	if (token !== 'null') {
		console.log('---have_token--')
		try {
			var decoded=jwt.verify(token,'cgs')
			ctx.user = decoded.data	
		console.log(decoded.data)
			await next()
		} catch (err) {
			console.log('ERR',err)
			ctx.body = { err: -1, msg: 'token invalid', data: {} }
		}
	} else {
		console.log('---22222--')
		ctx.throw(401, 'token不存在')
	}
}