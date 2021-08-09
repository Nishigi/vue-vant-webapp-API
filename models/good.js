const mongoose = require('mongoose')

module.exports = mongoose.model('goods', mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    price: Number,
    hot: Boolean,
    rank: Number,
    cate: String,
    create_time: { type: Number, default: Date.now() },
    status: { type: Number, default: 1 }
}))
