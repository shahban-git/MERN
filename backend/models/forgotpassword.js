const mongoose = require('mongoose');

const ForgotPassSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Make email required
    Otp: { type: String, required: true },   // Make OTP required
    loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForgotPassword', ForgotPassSchema);
