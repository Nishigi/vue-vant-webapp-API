
// const {verifyToken} = require('../utils/jwt')

const jwt=require('jsonwebtoken')

module.exports=async (ctx,next)=>{
	// ctx.user=await verifyToken(ctx)
	// console.log('---checktoken user',user)
	// if(user){
	// 	ctx.user=user
	// await next()
	// }
	// else{
	// 	ctx.body={err:-1,msg:'token invalid',data:{}}
	// }
	const token =ctx.headers.authorization
	console.log('-----',token)
	if(token!=='null'){
		console.log('---11111--')
		try{
			var decoded=jwt.verify(token,'cgs')
			ctx.user=decoded.data			
			await next()
		}catch(err){
			ctx.body={err:-1,msg:'token invalid',data:{}}
		}
	}else{ 
		console.log('---22222--')
		ctx.throw(401,'token不存在')
	} 
}