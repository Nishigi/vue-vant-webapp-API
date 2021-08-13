const userModel = require('../models/user')
const jwt = require('../utils/jwt')

class UserController {
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
	// 注册接口
	static async register(ctx) {
		let { username, password } = ctx.request.body
		const user = await userModel.findOne({ username })
		console.log('注册信息', username, password, user)
		if (user) return ctx.body = { err: -1, msg: '用户名已存在' }
		await userModel.insertMany([{ username, password }])
		ctx.body = { err: 0, msg: '注册成功', data: { username } }
	}
	// 登录接口
	static async login(ctx) {
		let { username, password } = ctx.request.body
		const user = await userModel.findOne({ username, password })
		//	console.log('登录信息', username, password, user)
		if (user) {
			if(user.status){
				const token = jwt.createToken(user)			
				ctx.body = { err: 0, msg: '登录成功', data: {token} }
			}else{
				ctx.body = { err: -1, msg: '你已经被辞退，不能再登录' }
			}
		} else {
			ctx.body = { err: -1, msg: '用户名和密码不匹配' }
		}
	}
	//获取用户信息
	static async getUserInfo(ctx) {
		let user= ctx.user
		console.log('get--userinfo--')		 	
		const info = await userModel.findOne({ _id:user._id})
		ctx.body = { err:0,msg:'成功获取当前用户信息',data:{ info } }
	}
	//添加用户
	static async addUser(ctx) {
		let { username, password,role } = ctx.request.body
		const user = await userModel.findOne({ username }) 		
		console.log('add--userinfo--')	
		if (user) return ctx.body = { err: -1, msg: '用户名已存在' }
		let ele={ 
			 username,
			 password,
			 role,
			 role_name:role,
		}
		await userModel.insertMany([ele])
		ctx.body = { err: 0, msg: '添加成功', data: { username } }
	}
	//用户状态
	static async changeUserStatus(ctx) {
		let { id, status } = ctx.request.query
		await userModel.updateOne({_id: id}, {$set: {status: parseInt((status)) }})
		ctx.body = {err: 0, msg: 'success'}
	}
}
module.exports = UserController
