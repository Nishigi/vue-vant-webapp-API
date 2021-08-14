const fs=require('fs')
const path=require('path')

class UploadController {
	// 上传图片
    static async uploadImg(ctx) {
		
        const file =ctx.request.files.good
		const readStream=fs.createReadStream(file.path)
		const filePath=`/cdn/${Date.now()}_${file.name}`
		const writeStream=fs.createWriteStream(path.resolve(__dirname),`../public${filePath}`)		
		await readStream.pipe(writeStream)
		
		ctx.body={err:0,msg:'upload success',data:{img:filePath}}
    }
}
module.exports = UploadController
