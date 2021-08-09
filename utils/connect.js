const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection

db.on('open', () => console.log('mongodb连接成功'))
db.on('error', () => console.log('连接失败'))
// const mongoose = require('mongoose') // 驱动模块

