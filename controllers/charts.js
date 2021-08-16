 
const jwt = require('../utils/jwt')

class ChartsController {
	//获取所有用户
	static async getUserList(ctx) {		
		let { name, page, size } = ctx.request.query
		
		page = parseInt(page || 1)
		size = parseInt(size || 10)	
		
		const params = {username: new RegExp((name||''), 'img')}	
		const total = await userModel.find(params).count()
		const list = await userModel.find(params).limit(size).skip((page-1)*size)
		ctx.body = {
			err: 0,
			msg: 'success',
			data: { list,total }
		}
	}
 
module.exports = ChartsController
