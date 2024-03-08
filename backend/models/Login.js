const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    email: { type: String, index: true },
    password: { type: String, index: true },
    loginTime: { type: Date, default: Date.now } // Add the loginTime field
})

module.exports = mongoose.model('login', loginSchema);