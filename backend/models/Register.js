const mongoose = require('mongoose')

const Registerschma = new mongoose.Schema({
    name: String,
    email: { type: String, index: true, unique: true },
    password: String,
    RegisterTime: { type: Date, default: Date.now } // Add the loginTime field
})

module.exports = mongoose.model('users', Registerschma);