const mongoose = require('mongoose')

const productschema = new mongoose.Schema({

    productname: String,
    price: String,
    category: String,
    userid: String,
    company: String

})

module.exports = mongoose.model('product', productschema);