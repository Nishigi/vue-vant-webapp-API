const articleModel = require('../models/article')
const jwt = require('../utils/jwt')

class ArticleController {
	//获取下拉选项
	static getCates(ctx){
		cxt.body = {
			err:0,
			msg:'success',
			data:{
				list:[
					{_id:1 ,cate:'amen' ,cate_zh:'仙侠传奇'},
					{_id:2 ,cate:'city' ,cate_zh:'都市传说'},
					{_id:3 ,cate:'world' ,cate_zh:'异类世界'},
				]
			}
		}
	}
	//添加或编辑文章
	static async articleAddOrEdit(ctx){
		let {title,author,img,cate,content,id} = ctx.request.body
		
		const user=ctx.user
		let ele = {
			title,
			author,
			img,
			cate,
			content
		}
		if(id) {
			ele['check_status'] = 0
			ele['create_time'] = Date.now()
			info = await articleModel.updateOne({_id: id}, {$set: ele})
		}else{
			info =  await articleModel.insertMany([ele])
		}
		cxt.body={ err:0,msg:'success', data: {info}}
	}
	//文章列表
	static async articleList(ctx){
		let { page, size, title, cate, start_time, end_time } =ctx.request.query
		page = parseInt(page||1)
		size = parseInt(size||10)
		start_time = parseInt(start_time||0)
		end_time = parseInt(end_time||0)
		
		const params={
			title: new RegExp((title||''),'img'),
			cate: cate||'',
			status: 1,
			create_time: {$gte:start_time,$lte:end_time},
		}
		if(!start_time) delete params.create_time
		if(!params.cate) delete params.cate
		const total = await articleModel.find(params).count()
		const list = await articleModel.find(params).limit(size).skip((page-1)*size).sort({create_time:-1})
		cxt.body={ err:0,msg:'success', data: {total,list}}
	}
	//文章信息
	static async articleInfo(ctx){
		let { id } = ctx.request.query
		const info =await articleModel.findOne({_id : id })
		cxt.body={ err:0,msg:'success', data: {info} }
	}
}
module.exports=ArticleController