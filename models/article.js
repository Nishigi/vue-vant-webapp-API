const mongoose = require('mongoose')

module.exports=mongoose.model('article',mongoose.Schema({
	title : String,
	author : String,
	img:String,
	cate : String,
	create_time : { type:Number,default:Date.now() },
	content : String,
	check_status : { type:Number,default:0 },
	status: { type:Number,default:1 }
}))