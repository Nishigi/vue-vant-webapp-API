const jwt=require('jsonwebtoken')

// 生成token
function createToken(user){
	return jwt.sign(
	{ 
		data:user, //加密的用户信息
		iat: Math.floor(Date.now() / 1000) - 30 ,//token有效期，单位：秒
	},
	'cgs');//暗号
}



// 解析token
	
function verifyToken(ctx){
	return new Promise((resolve,reject)=>{
		const token =ctx.headers.authorization
		try{
			var decode=jwt.verify(token,'cgs')
			// console.log('---decode',decode)
			resolve(decode.data)
		}catch(err){
			reject(err)
		}
	})	
}

module.exports = {
	createToken,
	verifyToken
}