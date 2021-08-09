const cartModel = require('../models/cart') 
const goodModel = require('../models/good') 

class CartController {
	//添加购物车
    static async addToCart(ctx) {
        let {good_id,num} =ctx.request.body
		// console.log('user----',ctx.user)
		const u=ctx.user
		
		const ele={
			user_id:u._id,
			good_id,
			num:num || 1
		}
		// num=Number(num)
		
		const good=await cartModel.findOne({user_id:u._id,good_id,status:1})
		
		if(good){
		    await cartModel.updateOne({user_id:u._id,good_id},{num:good.num+num})
		}else{
			await cartModel.insertMany([ele])
		}
			
		ctx.body={
				err:0,
				msg:"success",
				data:{}
			}
			
    }
	// 获取购物车列表
	static async getCartList(ctx){
		const u=ctx.user
		
		let list=await cartModel.find({status:1,user_id:u._id,})
		// let count=0
		let newList=JSON.parse(JSON.stringify(list))
		
		for(let i=0;i<newList.length;i++){
			newList[i]['good_info']=await goodModel.findOne({_id:newList[i].good_id})
		}
		// console.log('new-list-----',list)
	    ctx.body={err:0,msg:'success',data:{list:newList} }
	}
	//删除项目
	static async delCartItem(ctx){
		let {cart_id}=ctx.request.query
		
		await cartModel.updateOne({_id:cart_id},{status:0})
		
		ctx.body={ err:0 , msg: 'success', data:{}}
	}
	// 更新项目
	static async updateCartCount(ctx){
		let {cart_id,newNum}=ctx.request.query
		await cartModel.updateOne({_id:cart_id},{num:newNum})
		ctx.body={err : 0, msg : 'success',data:{}}
	}
	
	static async submitCart(ctx){
		let {ids}=ctx.request.body
		const arr=ids.split(';').filter(el=>el)
		arr.forEach(async(el)=>{
			await cartModel.updateOne({_id:el},{status:0})
		})
		ctx.body={err : 0, msg : 'success',data:{}}
	}
}

module.exports = CartController
