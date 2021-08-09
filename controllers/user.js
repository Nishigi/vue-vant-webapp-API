const userModel = require('../models/user')
const jwt = require('../utils/jwt')

class UserController {
	
    static async getUserList(ctx) {
        let list = await userModel.find({})
        ctx.body = {
            err: 0,
            msg: 'success',
            data: { list }
        }
    }
	// 注册接口
	static async register(ctx){
		let {username,password}=ctx.request.body
		const user=await userModel.findOne({username})
		console.log('注册信息',username,password,user)
		if(user) return ctx.body={err:1,msg:'用户名已存在'}
		await userModel.insertMany([{username,password}])
		ctx.body={err:0,msg:'注册成功',data:{username}}
	}
	// 登录接口
	static async login(ctx){
		let {username,password}=ctx.request.body
		const user=await userModel.findOne({username,password})
		console.log('登录信息',username,password,user)
		if(user) {
			const token=jwt.createToken(user)
			ctx.body={
			err:0,
			msg:'登录成功',
			data:{ token }
			}
		}else{
			ctx.body={
			err:1,
			msg:'用户名或密码不匹配'
			}
		}
		
		
	}
}

module.exports = UserController
