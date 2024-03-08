
const LoginSchema = require('../models/Login');
const RegisterSchema = require('../models/Register');
const logger = require('../logger');
// const bcrypt = require('bcrypt');

const ChangePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the 'password' field is not empty
    if (!password && !email) {
      return res.status(400).send({ status_code: "01", status_desc: 'fail', error: 'Password change failed.Email & Password cannot be empty.' });
    }

    // Check if the user exists in the 'RegisterSchema'
    const user = await RegisterSchema.findOne({ email });
    if (!user) {
      logger.info(`${email} this Email does not exist`, { route: '/ChangePassword' });
      return res.status(404).send({ status_code: "01", status_desc: 'fail', error: 'User not found. Password change failed.' });
    }

    // Hash the new password before updating it in the database
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Update password in the 'users' collection
    const userUpdateResult = await RegisterSchema.updateOne({ email: user.email }, { password: password });

    // Update password in the 'login' collection
    const loginUpdateResult = await LoginSchema.updateOne({ email: user.email }, { password: password });

    // Check if both updates were successful
    if (userUpdateResult.modifiedCount > 0 && loginUpdateResult.modifiedCount > 0) {
      logger.info(`Password changed successfully for email: ${email}`, { route: '/ChangePassword' });
      return res.status(200).send({ status_code: "00", status_desc: 'success', message: 'Password changed successfully' });
    } else {
      logger.info(`Password change failed for email: ${email}`, { route: '/ChangePassword' });
      return res.status(400).send({ status_code: "01", status_desc: 'fail', error: 'Password change failed' });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ status_code: "01", status_desc: 'fail', error: 'Internal server error' });
  }
};

module.exports = {
  ChangePassword
};
